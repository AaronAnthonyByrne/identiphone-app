import config from '../../config.js';
import fs from 'fs';

const IdCard = require('composer-common').IdCard;
const BusinessNetworkCardStore = require('composer-common').BusinessNetworkCardStore;
const WalletBackedCardStore = require('composer-common').WalletBackedCardStore;

async function createCard(identity, newMemberDetails){

    const data ={
        email : identity.email,
        version: 1,
        enrollmentSecret: identity.password,
        businessNetwork: config.networkName
    };

    const idCardData = new IdCard(data, config.connectionProfile);
    const idCardName = new BusinessNetworkCardStore.getDefaultCardName(idCardData);

    let userCardDir = '${config.cardDir}/${data.email}@${data.businessNetwork}';
    await idCardData.toDirectory(userCardDir, fs);

    return;
}

module.exports = {createCard}