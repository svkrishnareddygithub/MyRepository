import { LightningElement,wire, api,track } from 'lwc';

export default class Opp_tracking_child extends LightningElement {
    keyIndex = 0;

    @track itemList = [
        {
            id: 0
        }
    ];



    addRow() {
        ++this.keyIndex;
        let newItem = [{ id: this.keyIndex }];
         this.itemList.push(newItem);
    }

    removeRow(event) {
        if (this.itemList.length >= 2) {
        this.itemList = this.itemList.filter(function (element) {
        returnparseInt(element.id) !== parseInt(event.target.accessKey);
                    });
                }
            }

            handleSubmit()   {
                let isVal = true;
                this.template.querySelectorAll('lightning-input-field').forEach(element => {
                    isVal = isVal &&   element.reportValidity();
                });
                if (isVal) {
                    this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
                        element.submit();
                    });
                     dispatchSuccessEvent(SUCCESS_TITLE, SUCCESS_MESSAGE);
                    //   Navigate to the Account home page
                    this[NavigationMixin.Navigate]({
                        type: 'standard__objectPage',
                        attributes: {
                            objectApiName: 'Account',
                            actionName: 'home',
                        },
                    });
                } else {
                     dispatchErrorEvent(ERROR_TITLE, ERROR_MESSAGE);
                }
            }

}