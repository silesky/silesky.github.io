window.analytics.ready(() => {
  console.log(window.analytics.VERSION)
})

const createEvent = (eventName, cb, selector) => {
  document.querySelector(selector).addEventListener("click", function (e) {
    e.preventDefault();
    var contents = document.querySelector("#event").value;
    var evt = JSON.parse(contents);
    console.profile(eventName);
    console.time(eventName);
    var promise = cb(evt);
    promise.then(function (ctx) {
      console.timeEnd(eventName);
      console.profileEnd(eventName);
      ctx.flush();
      document.getElementById("logs").textContent = JSON.stringify(
        ctx.event,
        null,
        "  "
      );
    });
  });
};

createEvent(
  "track",
  (evt) => {
    return window.analytics.track(
      evt.name || "",
      evt.properties || {},
      evt.options || {}
    );
  },
  "#track"
);

createEvent(
  "identify",
  (evt) => {
    return window.analytics.identify(
      evt.name || "",
      evt.properties || {},
      evt.options || {}
    );
  },
  "#identify"
);

createEvent(
  "page",
  (evt) => {
    return window.analytics.page(evt.properties);
  },
  "#page"
);
