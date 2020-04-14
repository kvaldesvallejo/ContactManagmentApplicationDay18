const url = "https://assets.breatheco.de/apis/fake/contact/agenda/kAgenda";
const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			loadContact() {
				fetch(url)
					.then(response => response.json())
					.then(result => {
						console.log("Get contact: ", result), setStore({ contacts: result });
					})
					.catch(e => console.error(e));
			}
		}
	};
};

export default getState;
