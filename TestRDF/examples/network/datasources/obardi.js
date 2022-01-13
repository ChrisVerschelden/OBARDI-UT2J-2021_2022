var groupe = [
    {
        id: 1,
        name: "Généralités",
    },
    {
        id: 2,
        name: "Emections",
    },
    {
        id: 3,
        name: "Communes",
    },
]

var nodes = [
    {
        id: 1,
        label: "Tour",
        title: "TourLab",
        value: 30,
        group: 1,
    },
    {
        id: 2,
        label: "Consul",
        title: "ConsulLab",
        value: 30,
        group: 1,
    },
    {
        id: 3,
        label: "Orléans",
        title: "OrléansLab",
        value: 30,
        group: 1,
    },
    {
        id: 4,
        label: "Ambroise",
        title: "AmbroiseLab",
        value: 20,
        group: 2,
    },
    {
        id: 5,
        label: "Chinon",
        title: "ChinonLab",
        value: 20,
        group: 2,
    },
    {
        id: 6,
        label: "Loches",
        title: "LochesLab",
        value: 20,
        group: 2,
    },
    {
        id: 7,
        label: "subdélégué",
        title: "subdéléguéLab",
        value: 20,
        group: 2,
    },
    {
        id: 8,
        label: "A",
        title: "ALab",
        value: 10,
        group: 3,
    },
    {
        id: 9,
        label: "B",
        title: "BLab",
        value: 10,
        group: 3,
    },
    {
        id: 10,
        label: "C",
        title: "CLab",
        value: 10,
        group: 3,
    },
    {
        id: 11,
        label: "D",
        title: "DLab",
        value: 10,
        group: 3,
    },
]

var edges = [
    {label: "subFeature", from: 1 , to: 4 , arrows:"to"},
    {label: "subFeature", from: 1 , to: 5 , arrows:"to"},
    {label: "subFeature", from: 1 , to: 6 , arrows:"to"},
    {label: "attachedTo", from: 2 , to: 3 , arrows:"to"},
    {label: "isClaiming", from: 2 , to: 5 , arrows:"to"},
    {label: "isClaiming", from: 2 , to: 6 , arrows:"to"},
    {label: "subFeature", from: 4 , to: 8 , arrows:"to"},
    {label: "subFeature", from: 4 , to: 9 , arrows:"to"},
    {label: "subFeature", from: 5 , to: 10 , arrows:"to"},
    {label: "subFeature", from: 6 , to: 11 , arrows:"to"},
    {label: "attachedTo", from: 7 , to: 6 , arrows:"to"},
    {label: "isDeclaredUnder", from: 7 , to: 3 , arrows:"to"},
]