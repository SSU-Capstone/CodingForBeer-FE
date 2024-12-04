import { useEffect, useRef, useState } from 'react';
import PPTRender from '../components/PPTRender';
import TextEditor from '../components/TextEditor';
import NavBar from '../components/NavBar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import Marpit from '@marp-team/marpit';

import { basicSetup, EditorView } from 'codemirror';
import { keymap } from '@codemirror/view';
import {
  markdown,
  markdownKeymap,
  markdownLanguage,
} from '@codemirror/lang-markdown';
import { Transaction, StateEffect } from '@codemirror/state';
import yorkie from 'yorkie-js-sdk';

import { oneDark } from '@codemirror/theme-one-dark';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { githubLight } from '@uiw/codemirror-theme-github';
import Marp from '@marp-team/marp-core';

const Home = () => {
  const [md, setMd] = useState('');
  const [mode, setMode] = useState('both');
  const [currentTheme, setCurrentTheme] = useState(oneDark);
  const [backgroundColor, setBackgroundColor] = useState('#282c34');
  const ref = useRef();
  const view = useRef();

  const themeBackgroundColors = {
    oneDark: '#282c34',
    dracula: '#282a36',
    githubLight: '#ffffff',
  };

  const docRef = useRef(null);
  const clientRef = useRef(null);

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
          docRef.current.update(
            (root) => {
              root.content.edit(fromA + adj, toA + adj, insertText);
            },
            `update content by ${clientRef.current.getID()}`,
          );
          adj += insertText.length - (toA - fromA);
        });
      }
      setMd(viewUpdate.state.doc.toString());
    }
  });

  async function main(editorParentElem) {
    clientRef.current = new yorkie.Client(import.meta.env.VITE_YORKIE_API_ADDR, {
      apiKey: import.meta.env.VITE_YORKIE_API_KEY,
    });
    const client = clientRef.current;
    await client.activate();

    docRef.current = new yorkie.Document('new-document');
    const doc = docRef.current;
    await client.attach(doc);
    doc.update(
      (root) => {
        if (!root.content) {
          root.content = new yorkie.Text();
        }
      },
      'create content if not exists',
    );

    const syncText = () => {
      const text = doc.getRoot().content;
      view.current.dispatch({
        changes: {
          from: 0,
          to: view.current.state.doc.length,
          insert: text.toString(),
        },
        annotations: [Transaction.remote.of(true)],
      });
      setMd(view.current.state.doc.toString());
    };

    doc.subscribe('$.content', (event) => {
      if (event.type === 'remote-change') {
        const { operations } = event.value;
        handleOperations(operations);
      }
    });

    await client.sync();

    view.current = new EditorView({
      doc: '',
      extensions: [
        basicSetup,
        markdown({ base: markdownLanguage }),
        keymap.of(markdownKeymap),
        updateListener,
        currentTheme,
      ],
      parent: editorParentElem,
      style: {
        height: '100%',
        overflow: 'auto',
      },
    });

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
      view.current.dispatch({
        changes,
        annotations: [Transaction.remote.of(true)],
      });
      setMd(view.current.state.doc.toString());
    }

    syncText();
  }

  useEffect(() => {
    main(ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    if (view.current) {
      view.current.dispatch({
        effects: StateEffect.reconfigure.of([
          basicSetup,
          markdown({ base: markdownLanguage }),
          keymap.of(markdownKeymap),
          updateListener,
          currentTheme,
        ]),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTheme]);

  return (
    <div className="flex flex-col max-h-screen">
      <NavBar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            setMode('edit');
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            setMode('both');
          }}
        >
          <VerticalSplitIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            setMode('preview');
          }}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={()=>{
            // const marpit = new Marpit();
            // // import { Marp } from '@marp-team/marp-core'
            // // 2. Add theme CSS
            // const theme = `
            // /* @theme example */

            // section {
            //   background-color: #369;
            //   color: #fff;
            //   font-size: 30px;
            //   padding: 40px;
            // }

            // h1,
            // h2 {
            //   text-align: center;
            //   margin: 0;
            // }

            // h1 {
            //   color: #8cf;
            // }
            // `
            // marpit.themeSet.default = marpit.themeSet.add(theme)

            // Convert Markdown slide deck into HTML and CSS
            const marp = new Marp()
            const { html , css } = marp.render(md)

            // const {html,css} = marpit.render(md);
            const htmlFile = `
            <!DOCTYPE html>
            <html><body>
              <style>${css}</style>
              ${html}
            </body></html>
            `;

            let w = window.open();
            w.document.write(htmlFile);
            w.document.close();
            
            w.focus();

            setTimeout(() => {w.print();w.close()}, 100);

            // w.print();
            // w.close();
          }}
        >
          <DownloadIcon />
        </IconButton>
        <select
          onChange={(e) => {
            const theme = e.target.value;
            let selectedTheme;
            switch (theme) {
              case 'oneDark':
                selectedTheme = oneDark;
                break;
              case 'dracula':
                selectedTheme = dracula;
                break;
              case 'githubLight':
                selectedTheme = githubLight;
                break;
              default:
                selectedTheme = oneDark;
            }
            setCurrentTheme(selectedTheme);
            setBackgroundColor(themeBackgroundColors[theme]);
          }}
          style={{
            color: 'white',
            backgroundColor: '#3f51b5',
            border: 'none',
            borderRadius: '4px',
            padding: '8px',
            marginLeft: '16px',
          }}
        >
          <option value="oneDark">One Dark</option>
          <option value="dracula">Dracula</option>
          <option value="githubLight">GitHub Light</option>
        </select>
      </NavBar>

      <div className="flex h-full max-h-[calc(100vh-64px)]">
        {mode === 'edit' && (
          <TextEditor mode={mode}>
            <div ref={ref} />
          </TextEditor>
        )}
        {mode === 'both' && (
          <>
            <TextEditor>
              <div ref={ref} />
            </TextEditor>
            <PPTRender markdown={md} backgroundColor={backgroundColor} />
          </>
        )}
        {mode === 'preview' && (
          <div className="w-full h-full overflow-auto">
            <PPTRender markdown={md} backgroundColor={backgroundColor} mode={mode}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
