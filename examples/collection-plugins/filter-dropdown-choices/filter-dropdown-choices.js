class Plugin extends CollectionPlugin {
	onLoad() {
		this.properties.populateChoices("Status", ({record, prop, defaultChoices}) => {
			if (!record) return defaultChoices;

			const projectType = record.choice("Type");
			if (!projectType) return defaultChoices;

			// Filter choices by the group that matches the project type, so
			// if the project type is "bug", only show the choices that are in the "bug" group
			return defaultChoices.filter(choice => choice.group === projectType);
		});
	}
}