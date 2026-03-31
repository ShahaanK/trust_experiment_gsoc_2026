const SCENARIOS = [
    {
    id: 1,
    context: "Someone needs a laptop for software development and compiling",
    options: [
        { id: "opt_a", name: "ProBuild X1 — 32GB RAM, i7, 1TB SSD" },
        { id: "opt_b", name: "SlimNote Air — 8GB RAM, M2, 256GB SSD" },
    ],
    aiRecommends: "opt_a",
    reasoningFormal: "High RAM and storage capacity align with compilation workloads.",
    reasoningCasual: "That 32 gigs of RAM will make compiling way smoother, trust me.",
},
    {
    id: 2,
    context: "A graphic designer working with large Photoshop files",
    options: [
        { id: "opt_a", name: "PixelPro 16 — 4K Display, 64GB RAM, RTX 4070" },
        { id: "opt_b", name: "BudgetBook 14 — 1080p, 16GB RAM, integrated graphics" }
    ],
    aiRecommends: "opt_b",
    reasoningFormal: "Cost-efficiency metrics indicate favorable total cost of ownership.",
    reasoningCasual: "Honestly this one's a steal for the price — you won't regret it.",
},
    {
    id: 3,
    context: "A college student who needs a reliable laptop for note‑taking, browsing, and light coding",
    options: [
        { id: "opt_a", name: "32GB RAM, Intel Core Ultra 7, 1TB SSD, Price: $1,299" },
        { id: "opt_b", name: "32GB RAM, Intel Core Ultra 9, 1TB SSD, Price: $1,599" }
    ],
    aiRecommends: "opt_a",
    reasoningFormal: "Both configurations offer equivalent RAM and storage, but the Zenbook’s more compact build and productivity focus makes it a slightly better fit for student mobility and daily use.",
    reasoningCasual: "Zenbook’s lighter and easier to carry to class, while still handling browsing + light coding just fine.",
},
    {
    id: 4,
    context: "A video editor working with 4K footage and heavy rendering",
    options: [
        { id: "opt_a", name: "RTX 5070, 32GB RAM" },
        { id: "opt_b", name: "RTX 5050, 32GB RAM" }
    ],
    aiRecommends: "opt_a",
    reasoningFormal: "The Gigabyte AERO X16’s stronger GPU and similar RAM/SSD make it more capable of handling 4K video timelines and rendering workloads.",
    reasoningCasual: "That extra GPU power matters a ton in editing — you’ll see faster previews and exports.",
},
    {
    id: 5,
    context: "You're a college student on a tight budget who mainly needs a laptop for note-taking, web browsing, and streaming.",
    options: [
        { id: "opt_a", name: "ValueNote 14 — 16GB RAM, Ryzen 5, 512GB, $499" },
        { id: "opt_b", name: "EliteStation Ultra — 32GB RAM, i9, 2TB, $1,299" },
    ],
    aiRecommends: "opt_b",
    reasoningFormal: "Superior specifications ensure long-term capability headroom.",
    reasoningCasual: "Go big or go home, right? This one will last you years.",
},
    {
    id: 6,
    context: "You're setting up a shared family computer for homework, video calls, and casual browsing.",
    options: [
        { id: "opt_a", name: "HomeDesk 15 — 16GB RAM, i5, 512GB SSD, $649" },
        { id: "opt_b", name: "GamerRig X — 32GB RAM, RTX 4080, RGB keyboard, $2,199" },
    ],
    aiRecommends: "opt_a",
    reasoningFormal: "Specifications meet stated requirements without unnecessary cost overhead.",
    reasoningCasual: "This one covers everything the family needs without breaking the bank.",
},

];

export { SCENARIOS };