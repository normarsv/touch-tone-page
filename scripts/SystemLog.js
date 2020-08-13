class SystemLog {
  constructor(showLog) {
    this.showLog = showLog !== undefined ? showLog : true;
  }

  getTrace() {
    const line = new Error().stack.split("\n")[3];
    const index = line.indexOf("at ");
    const clean = line.slice(index + 2, line.length);
    return clean;
  }

  log(title = "", body = "") {
    if (this.showLog === true) {
      if (title !== "" && body !== "") {
        console.log(title, body, this.getTrace());
      } else {
        body = title;
        console.log(body, this.getTrace());
      }
    }
  }

  error(title = "", body = "") {
    if (this.showLog === true) {
      if (title !== "" && body !== "") {
        console.error(title, body, this.getTrace());
      } else {
        body = title;
        console.error(body, this.getTrace());
      }
    }
  }

  warn(title = "", body = "") {
    if (this.showLog === true) {
      if (title !== "" && body !== "") {
        console.warn(title, body, this.getTrace());
      } else {
        body = title;
        console.warn(body, this.getTrace());
      }
    }
  }
}

export default SystemLog;
