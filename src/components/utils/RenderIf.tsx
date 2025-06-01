import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  condition: boolean
}

const RenderIf = ({ condition, children }: Props) => {
  if (!condition) return <React.Fragment></React.Fragment>

  return children
}

const SwitchRender = ({ children }: PropsWithChildren) => {
  const isArray = Array.isArray(children)

  if (isArray) {
    for (const child of children) {
      if (child.props.condition) {
        return <React.Fragment>{child.props.children}</React.Fragment>
      }
    }
  }

  return <React.Fragment>{children}</React.Fragment>
}

RenderIf.Group = SwitchRender

export default RenderIf
