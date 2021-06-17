const BASE_URL = "https://ntsv.pythonanywhere.com/api/";
//const BASE_URL = "http://localhost:5000/api/";
const BASE_URL_RECORDS = BASE_URL + "records";
const BASE_URL_PARTICULARS = BASE_URL + "particulars";

const Records = {
  get: function () {
    return fetch(BASE_URL_RECORDS).then((response) => response.json());
  },
  delete: function (id) {
    return fetch(BASE_URL_RECORDS + "?id=" + id, {
      method: "DELETE",
    }).then((response) => response.json());
  },
  update: function (id, date, particulars, bank, cash, _type) {
    let body = {
      date: date,
      particulars: particulars,
      bank: parseInt(bank),
      cash: parseInt(cash),
      _type: _type,
    };
    return fetch(BASE_URL_RECORDS + "?id=" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },
  add: function ({ date, particulars, bank, cash, _type }) {
    let body = {
      date: date,
      particulars: particulars,
      bank: bank,
      cash: cash,
      _type: _type,
    };
    return fetch(BASE_URL_RECORDS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },
};
const Particulars = {
  get: function () {
    return fetch(BASE_URL_PARTICULARS).then((response) => response.json());
  },
  add: function ({ particular, _type }) {
    let body = {
      particular: particular,
      _type: _type,
    };
    return fetch(BASE_URL_PARTICULARS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },
  update: function (id, particular, _type) {
    let body = {
      particular: particular,
      _type: _type,
    };
    return fetch(BASE_URL_PARTICULARS + "?id=" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },
  delete: function (id) {
    return fetch(BASE_URL_PARTICULARS + "?id=" + id, {
      method: "DELETE",
    }).then((response) => response.json());
  },
};
export { Records, Particulars };
