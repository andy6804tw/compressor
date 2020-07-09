const bar = document.getElementById("bar");


    let value = 0;
    const timer = window.setInterval((() => {
      console.log(value)
      value += 10
      bar.setAttribute("value", value);
      if (value >= 100)
        clearInterval(timer);
    }), 1000);