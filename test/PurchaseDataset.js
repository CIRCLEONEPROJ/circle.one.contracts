let expectThrow = require('./helpers/expectThrow.js');
let PurchaseDataset = artifacts.require('./PurchaseDataset.sol');
let TestToken = artifacts.require('./TestToken.sol');

contract('PurchaseDataset', accounts => {
    let token;
    let purchaseDataset;

    beforeEach(async () => {
        token = await TestToken.new({ from: accounts[0] });
        purchaseDataset = await PurchaseDataset.new(token.address, { from: accounts[1] });
    });

    it('can purchase with an unused hash', async () => {
        await token.approve(purchaseDataset.address, 1000, { from: accounts[0] });
        await purchaseDataset.purchase(100, "0x1", { from: accounts[0] });
        assert.isOk(await purchaseDataset.purchased.call("0x1"));
    });

    it('cannot purchase with a used hash', async () => {
        await token.approve(purchaseDataset.address, 1000, { from: accounts[0] });
        await purchaseDataset.purchase(100, "0x2", { from: accounts[0] });
        assert.isOk(await purchaseDataset.purchased.call("0x2"));
        await expectThrow(purchaseDataset.purchase(100, "0x2", { from: accounts[0] }));
    });

    it('cannot purchase when the price exceeds the allowance', async () => {
        await token.approve(purchaseDataset.address, 1000, { from: accounts[0] });
        await expectThrow(purchaseDataset.purchase(1001, "0x3", { from: accounts[0] }));
    });

    it('tokens are transferred to the smart-contract owner', async() => {
        await token.approve(purchaseDataset.address, 1000, { from: accounts[0] });
        await purchaseDataset.purchase(100, "0x4", { from: accounts[0] });
        assert.isOk(await purchaseDataset.purchased.call("0x4"));
        assert.equal(100, await token.balanceOf.call(accounts[1]));
    });
});