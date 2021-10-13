class ExchangeRate {
  constructor() {
    this.myHeaders = new Headers();
    this.myHeaders.append(
      "Authorization",
      `Bearer ${process.env.REACT_APP_EXCHANGE_RATE_ACCESS_TOKEN}`,
      "Access-Control-Allow-Origin: *"
      // Cors 에러 피할수 있음 더 공부가 필요.
      // https://xiubindev.tistory.com/115 참고하기
    );
    this.myHeaders.append("Content-Type", "application/json");

    this.randomNum = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

    this.getDate = () => {
      const dateObj = new Date();
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const date = dateObj.getDate();
      const query = `${year}${month > 9 ? month : `0${month}`}${date}`;
      console.log(query);
      return query;
    };

    this.raw = JSON.stringify({
      Header: {
        ApiNm: "InquireExchangeRate",
        Tsymd: `${this.getDate()}`,
        Trtm: "112428",
        Iscd: "001136",
        FintechApsno: `001`,
        ApiSvcCd: "DrawingTransferA",
        IsTuno: `-${this.randomNum(9, 1)}3210${this.randomNum(9, 1)}`,
        // 1에서 9까지 정수 난수 뽑아주기.
        // 양수에서는 사람들 간에 중복된 값이 너무 많으니 음수를 써주자 ㅋㅋ\
        // 난 너무 똑똑해..
        AccessToken: `${process.env.REACT_APP_EXCHANGE_RATE_ACCESS_TOKEN}`,
      },
      Btb: "0001",
      Crcd: "USD",
      Inymd: "20191213",
    });

    this.requestOptions = {
      method: "POST",
      headers: this.myHeaders,
      body: this.raw,
      redirect: "follow",
    };
  }

  async getExchangeRate() {
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/https://developers.nonghyup.com/InquireExchangeRate.nh",
      // Cors 에러 생겨서 https://cors-anywhere.herokuapp.com/ 이거 앞에 추가해서 우회 서버 데모 만들어서 접속하면
      // Cors 에러 피할수 있음 더 공부가 필요.
      this.requestOptions
    );
    const result = await response.json();
    return result;
  }
}

export default ExchangeRate;
