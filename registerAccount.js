// メタマスクがインストールされているかのチェック
if (typeof web3 !== 'undefined') {
    web3js = new Web3(web3.currentProvider);
} else {
    alert("MetaMaskをインストールして下さい．");
}

// メタマスクのアドレスを取得する
web3js.eth.getAccounts(function(err, accounts) {
    coinbase = accounts[0];
    console.log("coinbase is " + coinbase);
    if (typeof coinbase === 'undefined') {
        alert("MetaMaskを起動してください．")
    }
});

// コントラクトのアドレス
// あなたがデプロイしたコントラクトのアドレスに書き換えて下さい．
const address = "0xd9145CCE52D386f254917e481eB44e9943F39138";

// コントラクトのインスタンスを生成
contract = new web3js.eth.Contract(abi, address);

// アカウント登録する関数
function registerInfo() {
    // テキストボックスに入力されている情報を取得する
    var UserName = document.getElementById("UserName").value;
    var UserEmail = document.getElementById("UserEmail").value;

    // コントラクトの呼び出し
    return contract.methods.register(UserName, UserEmail)
    .send({ from: coinbase })
    .on("receipt", function(receipt){
        console.log("success");
    })
    .on("error", function(error){
            console.log("error"); 
    });
}

// アカウント情報を表示する関数
function showInfo() {
    var NumAccount = document.getElementById("NumAccount").value;
    // 表示されている情報を空にする
    sl = document.getElementById('AccountInfo');
    while(sl.lastChild) {
        sl.removeChild(sl.lastChild);
    }

    // 変数を取得する
    contract.methods.accounts(NumAccount).call().then(function(account){
        for (var i = 0; i < Object.keys(account).length/2; i++) {
            var li = document.createElement('li');
            li.textContent = Object.keys(account)[i+Object.keys(account).length/2] + " : " + account[i];
            document.getElementById('AccountInfo').appendChild(li);
        }
    });
}