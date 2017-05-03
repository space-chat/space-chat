(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//From this: https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API 
//From the package google-translate-api
// const translate = require('google-translate-api')

//  translate('Ik spreek Engels', {to: 'en'}).then(res => {
//     console.log(res.text);
//     //=> I speak English 
//     console.log(res.from.language.iso);
//     //=> nl 
// }).catch(err => {
//     console.error(err);
// });


var msg = new SpeechSynthesisUtterance('Hi Fish.');
// var msg = new SpeechSynthesisUtterance();
window.speechSynthesis.onvoiceschanged = function () {
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[6]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 2; //0 to 2
    msg.text = 'Hello World.';
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
}
msg.onend = function (e) {
    console.log('Finished in ' + event.elapsedTime + ' seconds.');
};


},{}]},{},[1]);
