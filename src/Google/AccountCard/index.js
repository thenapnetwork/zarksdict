import "./index.css";

export default ({ userName, userEmail, userPicture }) => {
    return <div className="accountCard">
        <div>
            <img src={userPicture} height={60} />
            <div>
                <span className="title">{userName}</span>
                <span className="mail">{userEmail}</span>
            </div>
        </div>
    </div>
}