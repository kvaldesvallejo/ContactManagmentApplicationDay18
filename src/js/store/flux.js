const url = "https://assets.breatheco.de/apis/fake/contact/";
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
				fetch(url + "agenda/kAgenda")
					.then(response => response.json())
					.then(result => {
						console.log("Get contact: ", result), setStore({ contacts: result });
					})
					.catch(e => console.error(e));
			},
			addContact(name, phone, email, address) {
				fetch(url, {
					method: "post",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						address: address,
						email: email,
						agenda_slug: "kAgenda"
					})
				}).then(() => {
					fetch(url)
						.then(response => response.json())
						.then(result => {
							console.log("result: ", result);
							setStore({
								contacts: result
							});
						})
						.catch(e => console.error(e));
				});
			},
			editContact(id, name, phone, email, address) {
				fetch(url + id, {
					method: "put",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						email: email,
						address: address,
						agenda_slug: "kAgenda"
					})
				}).then(() => {
					fetch(url + "agenda/kAgenda")
						.then(response => response.json())
						.then(result => {
							console.log("Get contact: ", result), setStore({ contacts: result });
						})
						.catch(e => console.error(e));
				});
			},
			deleteContact(index) {
				/*let store = scope.state.store;
                id = store.contacts[index].id;*/
				console.log(index);
				fetch(url + index, {
					method: "delete"
				}).then(() => {
					fetch(url + "agenda/kAgenda")
						.then(response => response.json())
						.then(result => {
							console.log("Get contact: ", result),
								setStore({
									contacts: result
								});
						})
						.catch(e => console.error(e));
				});
			}
		}
	};
};

export default getState;
