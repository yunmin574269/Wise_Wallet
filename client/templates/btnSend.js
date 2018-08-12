import { Template } from 'meteor/templating';

import './btnSend.html';

Template.btnSend.onCreated(function sendOnCreated(){
});

Template.btnSend.helpers({
    hasSel: function(){
        return curSel.get().localeCompare('send') == 0;
    }
});

Template.btnSend.events({
    'click a': function(event, template){
        curSel.set('send');
    }
});