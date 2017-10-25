## Email Team Prototype

This is a prototype of a email subscription management interface. We plan to do
user research into this for Q3.

## Setup

```
$ npm install
$ npm start
```

Then visit [http://localhost:3000/manage](http://localhost:3000/manage)

## Things left to do

We need to make the protoype work with data, perhaps backed by
[local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

Currently, clicking on things like 'Unsubscribe' changes the UI but it doesn't
manipulate any data. We need to add this behaviour to `manage.js`.

We then need to integrate this against the
[existing prototype](https://drive.google.com/open?id=0B-VU1pLvidLjZ2psdXd2UVJnNFk)
by adding a link from the 'Verification' page of the Education taxonomy to this
app.

When we direct people to this app we should set some params, e.g.
`email=foo@example.com&title=All%20publications&frequency=immediate|daily|weekly&edit_subscription_url=http://example.com`

We can then store these params in local storage as a subscription.

The `edit_subscription_url` should link back to the signup journey when the
'Refine subscription' button is clicked in this prototype.

We also need to host this prototype on Heroku and pull in the files from the
previous protoype into this one.

There are some instructions on this
[here](https://govuk-prototype-kit.herokuapp.com/docs/publishing-on-heroku).
