import { action, observable } from "mobx";
import { string } from "prop-types";
import { defaultToken } from "../utils/ninApi";

const namespace = "NIN_API";


const defaults = {
	nin_token: defaultToken,
	nin_username: "",
	nin_password: "",
	nita_username: "",
	nita_password: "",
	nita_baseurl: "",
	nita_token: "",
	nita_method: "",
	sepa_username: "",
	sepa_password: "",
	sepa_token: "",
	sepa_method: ""
}

type APIDataStore = typeof defaults;

export class ApiStore {
	@observable engine: any;
	@observable ninToken: string | null = null;
	@observable values: APIDataStore | null = null;
	@observable ninTokenRequest: Promise<void> = new Promise(() => {});

	@action setEngine = (engine: any) => {
		this.engine = engine;
	};

	checkDatastoreNamespace = async () => {
		// check exists
		const res = await this.engine.link.fetch("/api/dataStore");
		if (!res.includes(namespace)) {
			// Create the name space
			await this.engine.link.fetch(`/api/dataStore/${namespace}/${namespace}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(defaults),
			});
			return false;
		}
		return true;
	};

	@action fetchNINToken = async () => {
		const getTok = async () => {
			const namespaceExists = await this.checkDatastoreNamespace();
			if (namespaceExists) {
				this.ninToken = defaultToken;
			} else {
				const res: APIDataStore = await this.engine.link.fetch(
					`/api/dataStore/${namespace}/${namespace}`
				);
				this.ninToken = res.nin_token;
			}
		};
		this.ninTokenRequest = getTok();
		await this.ninTokenRequest;
	};

	@action fetchDSValues = async () => {
		const namespaceExists = await this.checkDatastoreNamespace();
		if (!namespaceExists) {
			this.values = defaults;
		} else {
			const res = await this.engine.link.fetch(
				`/api/dataStore/${namespace}/${namespace}`
			);
			this.values = res;
		}
	}

	@action saveDSValues = async (values) => {
		this.values = values;
		await this.engine.link.fetch(`/api/dataStore/${namespace}/${namespace}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({...this.values, ...values}),
		});
		
	}
}
