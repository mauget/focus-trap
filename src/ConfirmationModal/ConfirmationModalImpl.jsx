import React, { useRef } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import {CM_CENTER_CENTER, CM_TOP_CENTER, CM_TOP_LEFT, CM_TOP_RIGHT} from "./index";
import useEscapeKey from "../hooks/useEscapeKey";
import useOutsideClick from "../hooks/useOutsideClick";
import { trapFocusInComponent } from "../handlers/trapFocusInComponent";
import useInitialFocus from "../hooks/useInitialFocus";

// These are private components

// Modal background layer - visible or invisible, but always floating above client's elements
const Model = styled.div`
    z-index: auto;
    display: ${({show}) => (show ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width:100vw;
    background: rgba(0,0,0,0.5);
`;

// Rendered popup - a positional demo confirmation box
const Container = styled.div` 
    position:fixed;
    background: antiquewhite;
    width: 24rem;
    height: auto;
    
    top: ${({openPos}) => (
    {
        [CM_CENTER_CENTER]: '50%',
        [CM_TOP_LEFT]: '10%',
        [CM_TOP_CENTER]: '10%',
        [CM_TOP_RIGHT]: '10%'
    }[openPos])};
    
    left: ${({openPos}) => (
    {
        [CM_CENTER_CENTER]: '50%',
        [CM_TOP_LEFT]: '5%',
        [CM_TOP_CENTER]: '50%',
        [CM_TOP_RIGHT]: '95%'
    }[openPos])};
  
    transform: ${({openPos}) => (
    {
        [CM_CENTER_CENTER]: 'translate(-50%,-50%)',
        [CM_TOP_LEFT]: 'translate(0,0)',
        [CM_TOP_CENTER]: 'translate(-50%,0)',
        [CM_TOP_RIGHT]: 'translate(-100%,0)'
    }[openPos])};

    border-radius: 10px;
    padding: 0.75rem;
    color: rgba(0,0,139, 0.9);
`;

const Button = styled.button.attrs((props) => ({ ref: props.ref }))`
    background-color: ${({primary}) => (primary ? 'green' : 'red')};
    color: ${({primary}) => (primary ? 'white' : 'white')};
    border: solid 2px #9f7500;
    border-radius: 8px;
    width: 5.0rem;
    padding: 0.2rem;
    margin: 0.2rem;
    font-size: 1rem;
    &:focus {
      outline: none;
      box-shadow: 0 0 6px red;
    }
`;

const Header = styled.div`
    font-size: 2.4rem;
    color: rgba(0,0,139, 0.7);;
`;

const HBar = styled.div`
    width: 100%;
    height: 1px;
    border: solid 1px rgba(80,80,150, 0.4);
    background-color: rgba(80,80,150, 0.4);
`;

const ButtonBar = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    justify-content: flex-end;
`;

const Slot = styled.div`
    font-size: 1.6rem;
    color: inherit;
`;

export default function ConfirmationModalImpl(props) {
    const {
        handleClose, // renderProp fn returns true or false
        show, // boolean - visible/invisible
        headerText, // text
        detailText, // html / inner text
        openPos // symbol for placement
    } = { ...props };
    const sendYes = () => handleClose(true);

    const sendNo = () => handleClose(false);

    useEscapeKey(sendNo);

    const ref = useRef(null);
    useOutsideClick(sendNo, ref);

    const refModalTrap = useRef(null);
    useInitialFocus(show, ref, true);

    return (
        <Model show={show} onKeyDown={(e) => {trapFocusInComponent(e, refModalTrap);}} ref={refModalTrap}>
            <Container openPos={openPos} ref={ref}>
                <Header>{headerText}</Header>
                <HBar/>
                <Slot>{detailText}</Slot>
                <ButtonBar>
                    <Button onClick={sendNo} primary={false}>No</Button>
                    <Button onClick={sendYes} primary={true}>Yes</Button>
                </ButtonBar>
            </Container>
        </Model>
    );
}
ConfirmationModalImpl.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    headerText: PropTypes.string.isRequired,
    openPos: PropTypes.symbol.isRequired
};
