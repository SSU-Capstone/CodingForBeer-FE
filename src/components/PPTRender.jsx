import { Marp } from '@marp-team/marp-react'

const PPTRender = ({markdown}) => {
    return (
        <>
            <div id='ppt-render' className='w-1/2'>
                <Marp markdown={markdown} />
            </div>
        </>
    )
};

export default PPTRender;
