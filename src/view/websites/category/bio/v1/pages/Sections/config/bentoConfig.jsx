// 1. CONFIGURATION ET CONSTANTES
// config/bentoConfig.js

export const GENERAL_CONFIG = {
    BENTO_GRID_GAP: 15
};

export const GRID_CONFIG = {
    MAX_COLUMNS: 4,
    MAX_SEARCH_STEPS: 20,
    ANIMATION_DURATION: 0.1,
    PREVIEW_OPACITY: 0.7,
    PREVIEW_SCALE: 0.95,
    DEBOUNCE_DELAY: 16
};

export const TYPOGRAPHY = [
    {
        "id": 0,
        "type": "headline",
        "variables": [
            {
                "name": "H0",
                "type_size": { "value": 110, "units": "pixel" },
                "line_height": { "value": 100, "units": "percent" }
            },
            {
                "name": "H1",
                "type_size": { "value": 62, "units": "pixel" },
                "line_height": { "value": 120, "units": "percent" }
            },
            {
                "name": "H2",
                "type_size": { "value": 38, "units": "pixel" },
                "line_height": { "value": 120, "units": "percent" }
            },
            {
                "name": "H3",
                "type_size": { "value": 28, "units": "pixel" },
                "line_height": { "value": 130, "units": "percent" }
            }
        ]
    },
    {
        "id": 1,
        "type": "title",
        "variables": [
            {
                "name": "T1",
                "type_size": { "value": 24, "units": "pixel" },
                "line_height": { "value": 130, "units": "percent" }
            },
            {
                "name": "T2",
                "type_size": { "value": 20, "units": "pixel" },
                "line_height": { "value": 140, "units": "percent" }
            }
        ]
    },
    {
        "id": 2,
        "type": "body",
        "variables": [
            {
                "name": "B1",
                "type_size": { "value": 18, "units": "pixel" },
                "line_height": { "value": 150, "units": "percent" }
            },
            {
                "name": "B2",
                "type_size": { "value": 16, "units": "pixel" },
                "line_height": { "value": 160, "units": "percent" }
            }
        ]
    },
    {
        "id": 3,
        "type": "caption",
        "variables": [
            {
                "name": "C1",
                "type_size": { "value": 14, "units": "pixel" },
                "line_height": { "value": 140, "units": "percent" }
            },
            {
                "name": "C2",
                "type_size": { "value": 12, "units": "pixel" },
                "line_height": { "value": 130, "units": "percent" }
            }
        ]
    },
    {
        "id": 4,
        "type": "button",
        "variables": [
            {
                "name": "BTN_LG",
                "type_size": { "value": 16, "units": "pixel" },
                "line_height": { "value": 120, "units": "percent" }
            },
            {
                "name": "BTN_SM",
                "type_size": { "value": 14, "units": "pixel" },
                "line_height": { "value": 120, "units": "percent" }
            }
        ]
    }
]


export const themes = [
    {
        "id": 1,
        "name": "Default",
        "container": {
            "className": "container_item_df_style",
            "var": {
                "--bg-color": "#ffffff",
                "--box-shadow": "rgb(242, 242, 242) 0px 0px 0px 1px",
                "--border-radius": "12px",
                "--padding": "15px"
            }
        },
        "content": {
            "text": {
                "h1": {
                    "className": "content_item_txt_df_style",
                    "var": {
                        "--color": "#000000",
                        "--font-size": "24px",
                        "--font-weight": "400",
                        "--font-family": "inherit"
                    }
                },
                "h2": {
                    "className": "content_item_txt_df_style",
                    "var": {
                        "--color": "#000000",
                        "--font-size": "19px",
                        "--font-weight": "400",
                        "--font-family": "inherit"
                    }
                },
                "p": {
                    "className": "content_item_txt_df_style",
                    "var": {
                        "--color": "#000000",
                        "--font-size": "14px",
                        "--font-weight": "400",
                        "--font-family": "inherit"
                    }
                }
            },
            "buttons": {
                "link": {
                    "container": {
                        "className": "content_item_btn_link_df_style"
                    },
                    "content": {
                        "icon": {
                            "type": "svg",
                            "name": "arrow",
                            "path": null
                        },
                        "style": {
                            "color": "#ffffff",
                            "width": "12px"
                        }
                    }
                },
                "action": {
                    "container": {
                        "className": "content_item_btn_action_df_style",
                        "var": {
                            "--bg-color": "#ffffff",
                            "--box-shadow": "0 0 0 1px rgba(0, 0, 0, 0.5)",
                            "--width": "32px",
                            "--height": "32px"
                        }

                    },
                    "content": {
                        "icon": {
                            "type": "svg",
                            "name": null,
                            "path": null
                        },
                        "style": {
                            "color": "#333333",
                            "width": "12px"
                        }
                    }
                }
            }
        }
    }
]

export const BENTO_ITEMS = [
    {
        id: 1,
        content: {
            type: 'text',
            style: {
                box: {
                    backgroundColor: 'rgb(250 250 250)',
                    boxShadow: 'rgb(242 242 242) 0px 0px 0px 1px',
                    padding: '20px',
                    borderRadius: '12px',
                },
                text: {
                    color: '#000000',
                    lineHeight: 1.2,
                    fontSize: '1.5em',
                    fontWeight: 400,
                    fontFamily: 'var(--font-family)',
                    letterSpacing: '-0.5px',
                }
            },
            content: 'Hello World\nWelcome'
        },
        style: {
            mobile: "2x2",
            desktop: { h: 2, w: 2 }
        },
        position: {
            mobile: { x: 0, y: 0 },
            desktop: { x: 0, y: 0 }
        }
    },
    {
        id: 3,
        content: {
            type: 'text',
            style: {
                box: {
                    backgroundColor: 'rgb(250 250 250)',
                    boxShadow: 'rgb(242 242 242) 0px 0px 0px 1px',
                    padding: '20px',
                    borderRadius: '12px',
                },
                text: {
                    color: '#000000',
                    lineHeight: 1.2,
                    fontSize: '1.5em',
                    fontWeight: 400,
                    fontFamily: 'var(--font-family)',
                    letterSpacing: '-0.5px',
                }
            },
            content: 'Hello World\nWelcome'
        },
        style: {
            mobile: "2x2",
            desktop: { h: 2, w: 4 }
        },
        position: {
            mobile: { x: 0, y: 0 },
            desktop: { x: 0, y: 2 }
        }
    },
    {
        id: 4,
        content: {
            type: 'link',
            style: {
                box: {
                    backgroundColor: 'rgb(250 250 250)',
                    boxShadow: 'rgb(242 242 242) 0px 0px 0px 1px',
                    padding: '20px',
                    borderRadius: '12px',
                },
                text: {
                    title: {
                        color: '#000000',
                        lineHeight: 1.2,
                        fontSize: '1.15em',
                        fontWeight: 400,
                        fontFamily: 'var(--font-family)',
                        letterSpacing: '-0.5px',
                    },
                    text: {
                        color: 'rgb(106 106 106)',
                        lineHeight: 1,
                        fontSize: '0.9em',
                        fontWeight: 400,
                        fontFamily: 'var(--font-family)',
                        letterSpacing: '-1px',
                    }

                }
            },
            content: {
                icon: {
                    style: 's1',
                    content: 'instagram'
                },
                title: "Instagram",
                text: "omar.dendani.39",
                url: 'https://instagram.com/omar.dendani.39'
            }
        },
        style: {
            mobile: "2x2",
            desktop: { h: 2, w: 2 }
        },
        position: {
            mobile: { x: 0, y: 0 },
            desktop: { x: 2, y: 0 }
        }
    }
];


/*export const __BENTO_ITEMS = [
    {
        id: 1,
        content: {
            type: 'text',
            style: {
                box: {
                    backgroundColor: 'rgb(250 250 250)',
                    boxShadow: 'rgb(242 242 242) 0px 0px 0px 1px',
                    padding: '20px',
                    borderRadius: '12px',
                },
                text: {
                    color: '#000000',
                    lineHeight: 1.2,
                    fontSize: '1.5em',
                    fontWeight: 400,
                    fontFamily: 'Poppins',
                    letterSpacing: '-0.5px',
                }
            },
            content: {
                h1: 'Hello World\nWelcome'
            }
        },
        style: {
            mobile: "2x2",
            desktop: { h: 2, w: 2 }
        },
        position: {
            mobile: { x: 0, y: 0 },
            desktop: { x: 0, y: 0 }
        }
    },
    {
        id: 3,
        content: {
            type: 'text',
            style: {
                box: {
                    backgroundColor: 'rgb(250 250 250)',
                    boxShadow: 'rgb(242 242 242) 0px 0px 0px 1px',
                    padding: '20px',
                    borderRadius: '12px',
                },
                text: {
                    color: '#000000',
                    lineHeight: 1.2,
                    fontSize: '1.5em',
                    fontWeight: 400,
                    fontFamily: 'Poppins',
                    letterSpacing: '-0.5px',
                }
            },
            content: 'Hello World\nWelcome'
        },
        style: {
            mobile: "2x2",
            desktop: { h: 2, w: 4 }
        },
        position: {
            mobile: { x: 0, y: 0 },
            desktop: { x: 0, y: 2 }
        }
    },
    {
        id: 4,
        content: {
            type: 'link',
            style: {
                box: {
                    backgroundColor: 'rgb(250 250 250)',
                    boxShadow: 'rgb(242 242 242) 0px 0px 0px 1px',
                    padding: '20px',
                    borderRadius: '12px',
                },
                text: {
                    title: {
                        color: '#000000',
                        lineHeight: 1.2,
                        fontSize: '1.15em',
                        fontWeight: 400,
                        fontFamily: 'Poppins',
                        letterSpacing: '-0.5px',
                    },
                    text: {
                        color: 'rgb(106 106 106)',
                        lineHeight: 1,
                        fontSize: '0.9em',
                        fontWeight: 400,
                        fontFamily: 'Poppins',
                        letterSpacing: '-1px',
                    }
                    
                }
            },
            content: {
                icon: {
                    style: 's1',
                    content: 'instagram'
                },
                title: "Instagram",
                text: "omar.dendani.39",
                url: 'https://instagram.com/omar.dendani.39'
            }
        },
        style: {
            mobile: "2x2",
            desktop: { h: 2, w: 2 }
        },
        position: {
            mobile: { x: 0, y: 0 },
            desktop: { x: 0, y: 4 }
        }
    }
];*/



export const ICONS = [
    {
        name: 'instagram',
        variations: {
            s1: {
                svg: null,
                url: "https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-512.png"
            }
        }
    },
    {
        name: 'whatsapp',
        variations: {
            s1: {
                svg: null,
                url: "https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_23-whatsapp-512.png"
            }
        }
    }
];


