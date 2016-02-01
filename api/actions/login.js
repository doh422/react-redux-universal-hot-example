export default function login(req) {
  const user = {
    name: req.body.name,
    // save session id to user object
    sess_id: req.session.id,
    test_id: null,
    results: {
    	complete: false,
			personalities: {},
			personality_types: []
    }
  };
  req.session.user = user;
  return Promise.resolve(user);
}
