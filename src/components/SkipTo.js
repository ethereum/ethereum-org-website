import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
    background-color: ${(props) => props.theme.colors.primary};
`

const Anchor = styled.a`
    line-height: 2rem;
    position: absolute;
    top: -3rem;
    margin-left: 0.5rem;
    color: ${(props) => props.theme.colors.background};
    text-decoration: none;

    &:focus {
        position: static;
    }
`

const SkipTo = ({ href_id }) => {
    return (
        <Div>
            <Anchor href={href_id} >Skip to Main Content</Anchor>
        </Div>
    )
}

export default SkipTo