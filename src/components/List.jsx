import PostDisplay from "./PostDisplay";
import "../styles/List.css"

const List = ({posts, visible}) => {

    return (
        <>
            <div className="posts-display">                
                    {posts?.slice(0, visible).map((post) => (
                        <ul><PostDisplay post={post}></PostDisplay></ul>
                    ))}
                
            </div>
        </>
    );
}

export default List;