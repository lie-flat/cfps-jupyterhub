import {Message} from "react-bulma-components";
import IconText from "./icon-text";

export default function SimpleMessage({children, icon, title, color}) {
    return (
        <Message color={color}>
            <Message.Header>
                <IconText icon={icon} >{title}</IconText>
            </Message.Header>
            <Message.Body><p>{children}</p></Message.Body>
        </Message>
    );
}