import { Template } from 'meteor/templating';

import './btnWallet.html';

Template.btnWallet.onCreated(function walletOnCreated(){
});

Template.btnWallet.helpers({
    hasSel: function(){
        return curSel.get().localeCompare('wallet') == 0;
    }
});

Template.btnWallet.events({
    'click a': function(event, template){
        curSel.set('wallet');
    }
});