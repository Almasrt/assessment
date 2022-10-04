import { useNavigate  } from "react-router-dom";


const PostDisplay = (props) => {
    const navigate = useNavigate();

    const handlePostClick = () => {
        navigate('/detail', {state:{post : props.post}});
    }

    return (
        <div className="container-card" onClick={handlePostClick}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.post.title}</h5>
                    <div className="home-author">
                        <img src={props.post.author.avatar} alt="author image"></img>
                        <h6 className="card-subtitle mb-2 text-muted">{props.post.author.name}</h6>
                    </div>
                    <p className="card-text">{props.post.summary}</p>
                </div>
            </div>
        </div>
    );
}



export default PostDisplay;