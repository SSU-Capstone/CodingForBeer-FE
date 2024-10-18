import React, { useEffect, useRef, useState } from 'react';
import PPTRender from '../components/PPTRender';
import TextEditor from '../components/TextEditor';
import NavBar from '../components/NavBar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import ReactCodeMirror from '@uiw/react-codemirror';

import { basicSetup, EditorView } from 'codemirror';
import { keymap } from '@codemirror/view';
import {
  markdown,
  markdownKeymap,
  markdownLanguage,
} from '@codemirror/lang-markdown';
import { Transaction } from '@codemirror/state';
import yorkie from 'yorkie-js-sdk';




const Editor = () => {
    const [md, setMd] = useState('')
    async function main(editorParentElem) {
        // 01. create client with RPCAddr then activate it.
        const client = new yorkie.Client(import.meta.env.VITE_YORKIE_API_ADDR, {
          apiKey: import.meta.env.VITE_YORKIE_API_KEY,
        });
        await client.activate();
      
        // 02-1. create a document then attach it into the client.
        const doc = new yorkie.Document('my-first-document');
        await client.attach(doc);
        doc.update((root) => {
          if (!root.content) {
            root.content = new yorkie.Text();
          }
        }, 'create content if not exists');
      
        // 02-2. subscribe document event.
        const syncText = () => {
          const text = doc.getRoot().content;
          view.dispatch({
            changes: { from: 0, to: view.state.doc.length, insert: text.toString() },
            annotations: [Transaction.remote.of(true)],
          });
          setMd(view.state.doc.toString());
        };
      
        doc.subscribe('$.content', (event) => {
          if (event.type === 'remote-change') {
            const { operations } = event.value;
            handleOperations(operations);
          }
        });
      
        await client.sync();
      
        // 03-1. define function that bind the document with the codemirror(broadcast local changes to peers)
        const updateListener = EditorView.updateListener.of((viewUpdate) => {
          if (viewUpdate.docChanged) {
            for (const tr of viewUpdate.transactions) {
              const events = ['select', 'input', 'delete', 'move', 'undo', 'redo'];
              if (!events.map((event) => tr.isUserEvent(event)).some(Boolean)) {
                continue;
              }
              if (tr.annotation(Transaction.remote)) {
                continue;
              }
              let adj = 0;
              tr.changes.iterChanges((fromA, toA, _, __, inserted) => {
                const insertText = inserted.toJSON().join('\n');
                doc.update((root) => {
                  root.content.edit(fromA + adj, toA + adj, insertText);
                }, `update content byA ${client.getID()}`);
                adj += insertText.length - (toA - fromA);
              });
            }
            setMd(view.state.doc.toString());
          }
        });
      
        // 03-2. create codemirror instance
        const view = new EditorView({
          doc: '',
          extensions: [
            basicSetup,
            markdown({ base: markdownLanguage }),
            keymap.of(markdownKeymap),
            updateListener,
          ],
          parent: editorParentElem,
        });
      
        // 03-3. define event handler that apply remote changes to local
        function handleOperations(operations) {
          for (const op of operations) {
            if (op.type === 'edit') {
              handleEditOp(op);
            }
          }
        }
        function handleEditOp(op) {
          const changes = [
            {
              from: Math.max(0, op.from),
              to: Math.max(0, op.to),
              insert: op.value.content,
            },
          ];
      
          view.dispatch({
            changes,
            annotations: [Transaction.remote.of(true)],
          });
          setMd(view.state.doc.toString());
        }
      
        syncText();
      }

  const [mode, setMode] = useState('both'); // edit, both, preview
  const ref = useRef()
  useEffect(()=>{
    main(ref.current);
  }, []);

  return (
    <div className='max-h-screen'>
        <NavBar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{setMode('edit')}}
            >
            <EditIcon />
        </IconButton>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{setMode('both')}}
            >
            <VerticalSplitIcon />
        </IconButton>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{setMode('preview')}}
            >
            <VisibilityIcon />
        </IconButton>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            >
            <DownloadIcon />
        </IconButton>
        </NavBar>
        
        <div className='flex'>
            {mode == "edit" && (<TextEditor><div ref={ref} /></TextEditor>)}
            {mode == "both" && (
                <>
                    <TextEditor><div ref={ref} /></TextEditor>
                    <PPTRender markdown={md} />
                </>)}
            {mode == "preview" && <PPTRender markdown={md} />}
        </div>
    </div>
  );
};

export default Editor;