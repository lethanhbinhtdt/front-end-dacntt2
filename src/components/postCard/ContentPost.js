import React from 'react';

function ContentPost(props) {

    return (
        <div className='text-justify'>
            <p>content</p>
            <div className='text-center mt-2'>
                <img src='http://via.placeholder.com/1000x200' alt='Blog img' className='img-fluid post-img'></img>
            </div>
            <div className='text-center mt-2'>
                <iframe title='post ytb video'
                    src='https://www.youtube.com/embed/jn8NhISy9rg'
                    frameBorder='0'
                    className='post-ytb'
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    );
}

export default ContentPost;
