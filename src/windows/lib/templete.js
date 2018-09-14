class Templete
{
    constructor() {}

    static account(key, address, name, balance) {
        return `
        <a class="wallet-box" href="${key}" onclick="return false;">
            <span></span>
            <h3 class="not-ens-name">
                <i class="iconfont icon-key"></i>
                ${name}
            </h3>
            <span class="account-balance">
                ${balance}
            <span>wdc</span>
            </span>
            <span class="account-id">${address}</span>
        </a>
        `;
    }
}