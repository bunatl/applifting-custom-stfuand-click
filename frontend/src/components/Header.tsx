import React from 'react';
import { useParams } from "react-router-dom";
import { IPathParams } from '../types/componentTypes'

export function Quote() {
    return (
        <div className="quote">
            <div className="text">"It's really simple,  you just need to click as fast as you can"</div>
            <div className="author">- anonymous</div>
        </div>
    );
}

export function SharingInfo() {
    // URL params in react router: https://reactrouter.com/web/example/url-params
    const { slug } = useParams<IPathParams>();

    const addToClipboard = () => {
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
        const textToCopy = `${window.location.hostname}/${slug}`;
        navigator.clipboard.writeText(textToCopy).then(function () {
            alert("Text has been copied!")
        }, function () {
            console.error("An error has occured. Please copy text again.")
        });
    }

    return (
        <div className="share">
            <div>Clicking for team <span>{slug}</span></div>
            <div>Too lazy to click? Let your pals click for you: <div onClick={addToClipboard}>{`${window.location.hostname}/${slug}`}</div></div>
        </div>
    );
}

