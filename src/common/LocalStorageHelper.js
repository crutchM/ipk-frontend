

export default class LocalStorageHelper{
    constructor() {

        this.setData = this.setData.bind(this)
        this.getData = this.getData.bind(this)
    }


    setData(key, value){
        localStorage.setItem(key, value)
    }


    getData(key){
        return localStorage.getItem(key)
    }
}
