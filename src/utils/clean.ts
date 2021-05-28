export class Clean {

    cleanAll() : void {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('dados_conta');
    }
}