import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const IconText = ({icon, children, color = null, size = null}) => {
    return (<span className="icon-text">
      <FontAwesomeIcon color={color} size={size} className="icon" icon={icon}/>
      <span>{children}</span>
    </span>)
}

export default IconText