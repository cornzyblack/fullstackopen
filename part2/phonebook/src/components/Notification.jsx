const Notification = ({ message, cssClassName }) => {
    if (!message) return null;

    return (
        <div className={ cssClassName } >
            { message }
        </div>
    );
}

export const SuccessNotification = ({ message }) => {
    return <Notification message={ message } cssClassName="success"/>
}

export const ErrorNotification = ({ message }) => {
    return <Notification message={ message } cssClassName="error" />
}

export default Notification;
