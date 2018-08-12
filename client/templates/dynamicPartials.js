import { Template } from 'meteor/templating';

import './dynamicPartials.html';

Template.dynamicPartials.helpers({
    selPart: function(){
        if(curSel.get().localeCompare('wallet') == 0){
            return "mainWallet";
        }
        else if(curSel.get().localeCompare('send') == 0) {
            return "mainSend";
        }
    }
});