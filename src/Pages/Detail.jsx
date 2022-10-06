import { useLocation } from "react-router-dom";

const Detail = (props) => {
    const location = useLocation();
    return (
        <>
        <nav class="navbar navbar-light">
                <a class="navbar-brand" href="/">
                    <img src="logoH.ico"></img>
                </a>
            </nav>
        <div className="details">
            <h2>{location.state.post.title}</h2>
            <div className="details-author">
                <img src={location.state.post.author.avatar}></img>
                <h6 className="auth-name">By {location.state.post.author.name}</h6>
            </div>
            <h4>{location.state.post.summary}</h4>
            <h6 className="element-title">Categories :</h6>
            {location.state.post.categories?.map((c) => (
                <p>{c.name} (ID : {c.id})</p>
            ))}
            <div className="details-secundary">
                <h6 className="element-title">More Details :</h6>
                <p>ID : {location.state.post.id}</p>
                <p>Publication Date : {location.state.post.publishDate}</p>
            </div>
        </div>
        </>
    );
}

export default Detail;