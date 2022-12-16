'use strict';

const rootElement=document.querySelector('#main-content');
const root=ReactDOM.createRoot(rootElement);

root.render(
    <>
        <LeftPanel/>
        <RightPanel/>
    </>
);