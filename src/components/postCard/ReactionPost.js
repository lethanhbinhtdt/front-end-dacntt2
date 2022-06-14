import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCommentDots, faShareFromSquare} from '@fortawesome/free-regular-svg-icons'

function ReactionPost(props) {
    const {handleLikePost, dataReactionPost} = props
    const [text, setText] = useState('');
    const [infoCurrentUser, setInfoCurrentUser] = useState()
    const [isLiked, setIsLike] = useState(dataReactionPost? dataReactionPost.isLikePost:false);
    const [totolLike, setTotolLike] = useState(dataReactionPost?.likedBy.length)

    // useEffect(() => {
    //     console.log(text)
    // });
    var infoTotalLikeByUser = ""
    if(totolLike-1 > 0){
        if(isLiked){
            infoTotalLikeByUser =<><b className='text-link'> <span>Bạn</span></b>&nbsp;và&nbsp; <b className='text-link' onClick={() => setText('Xem tất cả người thích')}> <span>{totolLike-1}</span> người khác</b>&nbsp; đã yêu thích</>
            
        }
        else{
            infoTotalLikeByUser =<><b className='text-link' onClick={() => setText('Xem tất cả người thích')}> <span>{totolLike}</span> người</b>&nbsp;đã yêu thích</>
        }
    
       
    }
    else if(totolLike-1 === 0){
        if(isLiked){
            infoTotalLikeByUser =<><b className='text-link'> <span>Bạn</span></b>&nbsp;đã yêu thích</>
        }
        else{
            infoTotalLikeByUser =<><b className='text-link' onClick={() => setText('Xem tất cả người thích')}> <span>{totolLike}</span> người</b>&nbsp;đã yêu thích</>
        }
    }

    var likedPost = ""

    var showCurrentUserLike = ""
    // const handleShowCurrentUserLike = ()=>{

        // console.log("da bam vao ")
        // if(!isLiked){
        //     setIsLike(true)
        // }
  
        // if(isLiked){
        //     showCurrentUserLike = <b className='text-link' onClick={() => setText('Xem 1 người thích')}> <span>Bạn</span>    </b>
        // }
        // else{
        //     showCurrentUserLike = ""
        // }



    // }
    return (
        <div>
            {/* like/comment/share */}
            <div className='d-flex flew-row my-2'>
                {/* like button */}
                <button
                    className='btn btn-outline-dark border-0 rounded-circle fs-larger'
                    onClick={handleLikePost}>
                        {isLiked?     <FontAwesomeIcon icon="fa-solid fa-heart" />  :  <FontAwesomeIcon icon={faHeart} />}
     
                </button>
                {/* comment button */}
                <button
                    className='btn btn-outline-dark border-0 rounded-circle fs-larger mx-1'
                    onClick={() => setText('Bình luận bài đăng')}>
                    <FontAwesomeIcon icon={faCommentDots} />
                </button>
                {/* share button */}
                <button
                    className='btn btn-outline-dark border-0 rounded-circle fs-larger'
                    onClick={() => setText('Chia sẽ bài đăng')}>
                    <FontAwesomeIcon icon={faShareFromSquare} />
                </button>
            </div>

            <div className='d-flex flew-row post-cmt-info'>
                <img src='http://via.placeholder.com/20x20' alt='Blog user comments' className='border rounded-circle border-2 border-white'></img>
                <img src='http://via.placeholder.com/20x20' alt='Blog user comments' className='border rounded-circle border-2 border-white transfer-x--8'></img>
                <img src='http://via.placeholder.com/20x20' alt='Blog user comments' className='border rounded-circle border-2 border-white transfer-x--16'></img>
                <div className='fs-smaller ms-2 transfer-x--16'>
                    
                    {/* <b className='text-link'
                        onClick={() => setText('Xem tất cả người thích')}>
                        <span>{dataReactionPost?.likedBy.length-1}</span> người khác
                    </b> */}
                    {infoTotalLikeByUser}
            
                </div>
            </div>

            {/* <div onClick={() => setText('Xem tất cả bình luận bài đăng')} className='text-link text-secondary fs-smaller'>Xem tất cả 50 bình luận</div> */}
            {/* End like/comment/share */}
        </div>
    );
}

export default ReactionPost;
