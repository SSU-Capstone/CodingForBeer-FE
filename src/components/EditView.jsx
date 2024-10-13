import React from 'react';
import Marp from '@marp-team/marp-core'

const EditView = () => {
    // Convert Markdown slide deck into HTML and CSS
    const marp = new Marp()
    const { html, css } = marp.render('# Hello, marp-core!')    
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </>
    )
};

export default EditView;
