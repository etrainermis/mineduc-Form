(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": (()=>Button),
    "buttonVariants": (()=>buttonVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/landing/navbar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Navbar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function Navbar() {
    _s();
    const [activeLink, setActiveLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentLogoIndex, setCurrentLogoIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Determine if we're on the programme page
    const isProgrammePage = pathname === "/programme";
    // Array of logo images for the slideshow
    const logoImages = [
        "/Group.png",
        "/global.png",
        "/summit.png",
        "/tvet.png"
    ];
    // Auto-advance logo slideshow
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const interval = setInterval({
                "Navbar.useEffect.interval": ()=>{
                    setCurrentLogoIndex({
                        "Navbar.useEffect.interval": (prevIndex)=>(prevIndex + 1) % logoImages.length
                    }["Navbar.useEffect.interval"]);
                }
            }["Navbar.useEffect.interval"], 2000) // Change logo every 2 seconds
            ;
            return ({
                "Navbar.useEffect": ()=>clearInterval(interval)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], [
        logoImages.length
    ]);
    const navLinks = [
        {
            name: "Home",
            href: "/"
        },
        {
            name: "Programme",
            href: "/programme"
        }
    ];
    const toggleMobileMenu = ()=>{
        setMobileMenuOpen(!mobileMenuOpen);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `w-full ${isProgrammePage ? "bg-white" : "bg-[#EBF2F8]"} h-[138px] flex items-center relative z-50`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 md:px-8 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative h-16 w-48",
                            children: logoImages.map((src, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 transition-opacity duration-1000",
                                    style: {
                                        opacity: currentLogoIndex === index ? 1 : 0,
                                        zIndex: currentLogoIndex === index ? 10 : 0
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: src || "/placeholder.svg",
                                        alt: `Rwanda FutureSkills Forum Logo ${index + 1}`,
                                        width: 192,
                                        height: 64,
                                        className: "object-contain",
                                        priority: index === 0
                                    }, void 0, false, {
                                        fileName: "[project]/app/landing/navbar.tsx",
                                        lineNumber: 59,
                                        columnNumber: 17
                                    }, this)
                                }, index, false, {
                                    fileName: "[project]/app/landing/navbar.tsx",
                                    lineNumber: 51,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/landing/navbar.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/landing/navbar.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-12",
                        children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: link.href,
                                className: `group relative py-2 ${pathname === link.href ? "font-semibold" : ""}`,
                                onMouseEnter: ()=>setActiveLink(link.name),
                                onMouseLeave: ()=>setActiveLink(null),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#026FB4] font-medium",
                                        children: link.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/landing/navbar.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute bottom-0 left-0 w-0 h-0.5 bg-[#026FB4] transition-all duration-300 group-hover:w-full", (activeLink === link.name || pathname === link.href) && "w-full")
                                    }, void 0, false, {
                                        fileName: "[project]/app/landing/navbar.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, link.name, true, {
                                fileName: "[project]/app/landing/navbar.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/landing/navbar.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex space-x-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "bg-white text-[#026FB4] border border-[#026FB4] hover:bg-[#026FB4] hover:text-white transition-colors duration-300 rounded-md px-6",
                                    children: "Login"
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/navbar.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/landing/navbar.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/delegate",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "bg-[#026FB4] text-white hover:bg-[#025a91] transition-colors duration-300 rounded-md px-6",
                                    children: "Register"
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/navbar.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/landing/navbar.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/landing/navbar.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "md:hidden text-[#026FB4]",
                        onClick: toggleMobileMenu,
                        "aria-label": "Toggle mobile menu",
                        children: mobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 24
                        }, void 0, false, {
                            fileName: "[project]/app/landing/navbar.tsx",
                            lineNumber: 109,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            size: 24
                        }, void 0, false, {
                            fileName: "[project]/app/landing/navbar.tsx",
                            lineNumber: 109,
                            columnNumber: 47
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/landing/navbar.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/landing/navbar.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden absolute top-full left-0 right-0 bg-[#EBF2F8] shadow-lg z-50 py-4 px-4 animate-accordion-down",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex flex-col space-y-4",
                    children: [
                        navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: link.href,
                                className: `text-[#026FB4] font-medium py-2 border-b border-[#026FB4]/20 ${pathname === link.href ? "font-semibold" : ""}`,
                                onClick: ()=>setMobileMenuOpen(false),
                                children: link.name
                            }, link.name, false, {
                                fileName: "[project]/app/landing/navbar.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col space-y-2 pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    onClick: ()=>setMobileMenuOpen(false),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "bg-white text-[#026FB4] border border-[#026FB4] hover:bg-[#026FB4] hover:text-white transition-colors duration-300 w-full",
                                        children: "Login"
                                    }, void 0, false, {
                                        fileName: "[project]/app/landing/navbar.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/navbar.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/delegate",
                                    onClick: ()=>setMobileMenuOpen(false),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "bg-[#026FB4] text-white hover:bg-[#025a91] transition-colors duration-300 w-full",
                                        children: "Register"
                                    }, void 0, false, {
                                        fileName: "[project]/app/landing/navbar.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/navbar.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/landing/navbar.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/landing/navbar.tsx",
                    lineNumber: 116,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/landing/navbar.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/landing/navbar.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(Navbar, "i3ah+dEHqHnjPs38qPQnJUHHDx8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/landing/hero-section.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>HeroSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function HeroSection() {
    _s();
    const backgroundRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative w-full overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: backgroundRef,
                className: "absolute inset-0 w-full h-full",
                style: {
                    backgroundImage: "url(/hero.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }
            }, void 0, false, {
                fileName: "[project]/app/landing/hero-section.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-[390px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 w-full h-full bg-[#026FB4] opacity-50"
                    }, void 0, false, {
                        fileName: "[project]/app/landing/hero-section.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 max-w-7xl mx-auto h-full flex flex-col items-center justify-center px-4 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                                className: "text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight",
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.8
                                },
                                children: [
                                    "RWANDA FUTURESKILLS",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/app/landing/hero-section.tsx",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, this),
                                    "FORUM 2025"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/landing/hero-section.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                className: "text-white text-sm md:text-lg max-w-3xl px-2",
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    duration: 0.8,
                                    delay: 0.3
                                },
                                children: "Join us in Kigali, Rwanda, for the Rwanda FutureSkills Forum 2025, a dynamic platform combining three major events: TVET Expo , Global Skills Connect (1-5 June), and Inter Ministerial Summit."
                            }, void 0, false, {
                                fileName: "[project]/app/landing/hero-section.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/landing/hero-section.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/landing/hero-section.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-[363px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 w-full h-full bg-[#23AF57] opacity-70"
                    }, void 0, false, {
                        fileName: "[project]/app/landing/hero-section.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 max-w-7xl mx-auto h-full flex flex-col items-center justify-center px-4 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                                className: "text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4",
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    duration: 0.8,
                                    delay: 0.4
                                },
                                children: "Global Skills Connect Conference"
                            }, void 0, false, {
                                fileName: "[project]/app/landing/hero-section.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                className: "text-white text-sm md:text-base max-w-3xl mb-6 md:mb-8 px-2",
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    duration: 0.8,
                                    delay: 0.5
                                },
                                children: "Global Skills Connect , and Inter Ministerial Summit(4-5 June) . Discover opportunities to connect, learn, and innovate in skills development."
                            }, void 0, false, {
                                fileName: "[project]/app/landing/hero-section.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.8,
                                    delay: 0.6
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/delegate",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "bg-white text-[#23AF57] hover:bg-transparent hover:text-white hover:border-white border border-transparent transition-all duration-300 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-medium rounded-md",
                                        children: "Book Your Spot"
                                    }, void 0, false, {
                                        fileName: "[project]/app/landing/hero-section.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/hero-section.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/landing/hero-section.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/landing/hero-section.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/landing/hero-section.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/landing/hero-section.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(HeroSection, "JLPSwcxDr1WGl7vFhycx+wWzqlI=");
_c = HeroSection;
var _c;
__turbopack_context__.k.register(_c, "HeroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/landing/events.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PartnersPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function PartnersPage() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PartnersPage.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            // Set canvas dimensions
            const resizeCanvas = {
                "PartnersPage.useEffect.resizeCanvas": ()=>{
                    const container = canvas.parentElement;
                    if (container) {
                        canvas.width = container.offsetWidth;
                        canvas.height = container.offsetHeight;
                    }
                }
            }["PartnersPage.useEffect.resizeCanvas"];
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);
            // Define positions with proper spacing
            const rtbPosition = {
                x: canvas.width * 0.25,
                y: canvas.height * 0.5
            };
            // Increased gap between lines and logos
            const lineEndGap = 80;
            // For the blue line, make it extend closer to the image
            const blueLineEndGap = 10;
            const positions = [
                {
                    x: canvas.width * 0.75,
                    y: canvas.height * 0.25,
                    color: "#23AF57"
                },
                {
                    x: canvas.width * 0.75,
                    y: canvas.height * 0.5,
                    color: "#00A9DE"
                },
                {
                    x: canvas.width * 0.75,
                    y: canvas.height * 0.75,
                    color: "#EC2227"
                }
            ];
            // Particle system
            class Particle {
                x;
                y;
                size;
                speedX;
                speedY;
                color;
                alpha;
                targetX;
                targetY;
                stage;
                controlPoint1;
                controlPoint2;
                progress;
                isCurved;
                constructor(startX, startY, targetX, targetY, color, isCurved, isTopCurve){
                    this.x = startX;
                    this.y = startY;
                    this.size = Math.random() * 3 + 1;
                    this.speedX = 0;
                    this.speedY = 0;
                    this.color = color;
                    this.alpha = 1;
                    this.targetX = targetX;
                    this.targetY = targetY;
                    this.stage = 0 // 0: moving to target, 1: scattering
                    ;
                    this.progress = 0;
                    this.isCurved = isCurved;
                    // Control points for Bezier curve
                    if (isCurved) {
                        const midX = (startX + targetX) / 2;
                        if (isTopCurve) {
                            // For top curve (green)
                            this.controlPoint1 = {
                                x: midX,
                                y: startY - 80
                            };
                            this.controlPoint2 = {
                                x: midX,
                                y: targetY - 80
                            };
                        } else {
                            // For bottom curve (red)
                            this.controlPoint1 = {
                                x: midX,
                                y: startY + 80
                            };
                            this.controlPoint2 = {
                                x: midX,
                                y: targetY + 80
                            };
                        }
                    } else {
                        // Straight line (blue)
                        this.controlPoint1 = {
                            x: 0,
                            y: 0
                        };
                        this.controlPoint2 = {
                            x: 0,
                            y: 0
                        };
                    }
                }
                update() {
                    if (this.stage === 0) {
                        // Move along path
                        this.progress += 0.005;
                        if (this.progress >= 1) {
                            // Reached target, start scattering
                            this.stage = 1;
                            this.speedX = (Math.random() - 0.5) * 2;
                            this.speedY = (Math.random() - 0.5) * 2;
                        } else {
                            // Calculate position along path
                            if (this.isCurved) {
                                // Cubic Bezier curve
                                const t = this.progress;
                                const mt = 1 - t;
                                this.x = mt * mt * mt * this.x + 3 * mt * mt * t * this.controlPoint1.x + 3 * mt * t * t * this.controlPoint2.x + t * t * t * this.targetX;
                                this.y = mt * mt * mt * this.y + 3 * mt * mt * t * this.controlPoint1.y + 3 * mt * t * t * this.controlPoint2.y + t * t * t * this.targetY;
                            } else {
                                // Linear interpolation for straight line
                                this.x = this.x + (this.targetX - this.x) * 0.02;
                                this.y = this.y + (this.targetY - this.y) * 0.02;
                            }
                        }
                    } else {
                        // Scatter
                        this.x += this.speedX;
                        this.y += this.speedY;
                        // Fade out
                        this.alpha -= 0.01;
                        if (this.alpha < 0) this.alpha = 0;
                    }
                }
                draw(ctx) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color + Math.floor(this.alpha * 255).toString(16).padStart(2, "0");
                    ctx.fill();
                }
            }
            // Create particle systems for each connection
            const particleSystems = [];
            let currentAnimation = 0 // 0: green, 1: blue, 2: red
            ;
            let animationTimer = 0;
            const animationDelay = 300 // Frames between animations
            ;
            // Function to create a new wave of particles
            const createParticleWave = {
                "PartnersPage.useEffect.createParticleWave": (targetIndex)=>{
                    const particles = [];
                    const target = positions[targetIndex];
                    const isCurved = targetIndex !== 1 // Curve for green and red, straight for blue
                    ;
                    const isTopCurve = targetIndex === 0 // Top curve for green
                    ;
                    // Starting point with gap from RTB logo
                    const startX = rtbPosition.x + 60 // Increased gap from RTB
                    ;
                    const startY = rtbPosition.y;
                    // End point with gap from destination logo
                    const endX = target.x - (targetIndex === 1 ? blueLineEndGap : lineEndGap);
                    const endY = target.y;
                    for(let i = 0; i < 30; i++){
                        particles.push(new Particle(startX + (Math.random() - 0.5) * 10, startY + (Math.random() - 0.5) * 10, endX, endY, target.color, isCurved, isTopCurve));
                    }
                    particleSystems.push(particles);
                }
            }["PartnersPage.useEffect.createParticleWave"];
            // Animation loop
            let animationFrameId;
            const animate = {
                "PartnersPage.useEffect.animate": ()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Starting point with gap from RTB logo
                    const startX = rtbPosition.x + 60 // Increased gap from RTB
                    ;
                    const startY = rtbPosition.y;
                    // Draw static connection lines with proper curves and gaps
                    ctx.lineWidth = 1.5;
                    // Green line (top curve)
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.bezierCurveTo((startX + (positions[0].x - lineEndGap)) / 2, startY - 100, (startX + (positions[0].x - lineEndGap)) / 2, positions[0].y - 100, positions[0].x - lineEndGap, positions[0].y);
                    ctx.strokeStyle = positions[0].color + "80" // 50% opacity
                    ;
                    ctx.stroke();
                    // Blue line (straight) - extend closer to the image
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(positions[1].x - blueLineEndGap, positions[1].y);
                    ctx.strokeStyle = positions[1].color + "80" // 50% opacity
                    ;
                    ctx.stroke();
                    // Red line (bottom curve)
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.bezierCurveTo((startX + (positions[2].x - lineEndGap)) / 2, startY + 100, (startX + (positions[2].x - lineEndGap)) / 2, positions[2].y + 100, positions[2].x - lineEndGap, positions[2].y);
                    ctx.strokeStyle = positions[2].color + "80" // 50% opacity
                    ;
                    ctx.stroke();
                    // Draw connection dots
                    const dotRadius = 5;
                    // RTB dot
                    ctx.beginPath();
                    ctx.arc(startX, startY, dotRadius, 0, Math.PI * 2);
                    ctx.fillStyle = "#026FB4";
                    ctx.fill();
                    // Target dots
                    positions.forEach({
                        "PartnersPage.useEffect.animate": (pos, index)=>{
                            ctx.beginPath();
                            ctx.arc(pos.x - (index === 1 ? blueLineEndGap : lineEndGap), pos.y, dotRadius, 0, Math.PI * 2);
                            ctx.fillStyle = pos.color;
                            ctx.fill();
                        }
                    }["PartnersPage.useEffect.animate"]);
                    // Update and draw particles
                    for(let i = particleSystems.length - 1; i >= 0; i--){
                        const system = particleSystems[i];
                        let allFaded = true;
                        for (const particle of system){
                            particle.update();
                            particle.draw(ctx);
                            if (particle.alpha > 0) {
                                allFaded = false;
                            }
                        }
                        // Remove completely faded particle systems
                        if (allFaded) {
                            particleSystems.splice(i, 1);
                        }
                    }
                    // Sequential animation logic
                    animationTimer++;
                    if (animationTimer >= animationDelay) {
                        animationTimer = 0;
                        // Move to next animation type
                        currentAnimation = (currentAnimation + 1) % 3;
                        // Create new particles for current animation
                        createParticleWave(currentAnimation);
                    }
                    animationFrameId = requestAnimationFrame(animate);
                }
            }["PartnersPage.useEffect.animate"];
            // Start with green animation
            createParticleWave(0);
            animate();
            return ({
                "PartnersPage.useEffect": ()=>{
                    window.removeEventListener("resize", resizeCanvas);
                    cancelAnimationFrame(animationFrameId);
                }
            })["PartnersPage.useEffect"];
        }
    }["PartnersPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-6xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl font-bold text-gray-900",
                            children: "Co-Hosted by"
                        }, void 0, false, {
                            fileName: "[project]/app/landing/events.tsx",
                            lineNumber: 310,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full max-w-xl mx-auto mt-4 border-t-2 border-blue-500"
                        }, void 0, false, {
                            fileName: "[project]/app/landing/events.tsx",
                            lineNumber: 311,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/landing/events.tsx",
                    lineNumber: 309,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative border border-gray-200 rounded-lg p-8 mb-12 min-h-[600px] w-full bg-white shadow-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                            ref: canvasRef,
                            className: "absolute inset-0 h-full pointer-events-none"
                        }, void 0, false, {
                            fileName: "[project]/app/landing/events.tsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: {
                                left: "15%",
                                top: "10%",
                                transform: "translate(-50%, -50%)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-40 h-40 relative",
                                children: [
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/mineduc.jpg",
                                        alt: "Republic of Rwanda Ministry of Education",
                                        width: 200,
                                        height: 200,
                                        className: "object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/app/landing/events.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/landing/events.tsx",
                                lineNumber: 320,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/landing/events.tsx",
                            lineNumber: 319,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: {
                                right: "15%",
                                top: "10%",
                                transform: "translate(50%, -50%)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-40 h-40 relative",
                                children: [
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/MIFOTRA.webp",
                                        alt: "MIFOTRA",
                                        width: 200,
                                        height: 200,
                                        className: "object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/app/landing/events.tsx",
                                        lineNumber: 334,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-center mt-1",
                                        children: "MIFOTRA"
                                    }, void 0, false, {
                                        fileName: "[project]/app/landing/events.tsx",
                                        lineNumber: 341,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/landing/events.tsx",
                                lineNumber: 333,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/landing/events.tsx",
                            lineNumber: 332,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: {
                                left: "15%",
                                top: "35%",
                                transform: "translate(-50%, -50%)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-35 h-25 relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/RTB.png",
                                    alt: "Rwanda Polytechnic",
                                    width: 120,
                                    height: 80,
                                    className: "object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/events.tsx",
                                    lineNumber: 348,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/landing/events.tsx",
                                lineNumber: 347,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/landing/events.tsx",
                            lineNumber: 346,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: {
                                left: "15%",
                                top: "50%",
                                transform: "translate(-50%, -50%)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-30 h-20 relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/RP.jpg",
                                    alt: "Rwanda TVET Board",
                                    width: 100,
                                    height: 80,
                                    className: "object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/events.tsx",
                                    lineNumber: 354,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/landing/events.tsx",
                                lineNumber: 353,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/landing/events.tsx",
                            lineNumber: 352,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: {
                                left: "15%",
                                top: "63%",
                                transform: "translate(-50%, -50%)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-32 h-15 relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/PSF.jpg",
                                    alt: "Private Sector Federation",
                                    width: 100,
                                    height: 40,
                                    className: "object-contain "
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/events.tsx",
                                    lineNumber: 360,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/landing/events.tsx",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/landing/events.tsx",
                            lineNumber: 358,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: {
                                left: "15%",
                                top: "85%",
                                transform: "translate(-50%, -50%)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-32 h-20 relative pt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/DP.jpg",
                                    alt: "Development Partners",
                                    width: 120,
                                    height: 80,
                                    className: "object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/events.tsx",
                                    lineNumber: 366,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/landing/events.tsx",
                                lineNumber: 365,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/landing/events.tsx",
                            lineNumber: 364,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: {
                                right: "15%",
                                top: "30%",
                                transform: "translate(50%, -50%)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-48 h-20 relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/GLOBALSKILLS.jpg",
                                    alt: "Rwanda FutureSkills Forum - Global Skills Connect",
                                    width: 180,
                                    height: 80,
                                    className: "object-contain bg-green-500"
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/events.tsx",
                                    lineNumber: 372,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/landing/events.tsx",
                                lineNumber: 371,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/landing/events.tsx",
                            lineNumber: 370,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: {
                                right: "15%",
                                top: "50%",
                                transform: "translate(50%, -50%)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-48 h-20 relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/INTERSUMMIT.jpg",
                                    alt: "Rwanda FutureSkills Forum - Interministerial Summit",
                                    width: 180,
                                    height: 80,
                                    className: "object-contain bg-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/events.tsx",
                                    lineNumber: 378,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/landing/events.tsx",
                                lineNumber: 377,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/landing/events.tsx",
                            lineNumber: 376,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: {
                                right: "15%",
                                top: "75%",
                                transform: "translate(50%, -50%)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-48 h-20 relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/TVETEXPO.jpg",
                                    alt: "Rwanda FutureSkills Forum - TVET Expo",
                                    width: 180,
                                    height: 80,
                                    className: "object-contain bg-red-500"
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/events.tsx",
                                    lineNumber: 384,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/landing/events.tsx",
                                lineNumber: 383,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/landing/events.tsx",
                            lineNumber: 382,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/landing/events.tsx",
                    lineNumber: 314,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/landing/events.tsx",
            lineNumber: 308,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/landing/events.tsx",
        lineNumber: 307,
        columnNumber: 5
    }, this);
}
_s(PartnersPage, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = PartnersPage;
var _c;
__turbopack_context__.k.register(_c, "PartnersPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/landing/stats-section.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>StatsSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const StatCard = ({ count, title, description, image })=>{
    _s();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "relative overflow-hidden rounded-lg",
        whileHover: {
            scale: 1.03
        },
        transition: {
            duration: 0.3
        },
        onMouseEnter: ()=>{
            setIsHovered(true);
            console.log(isHovered);
        },
        onMouseLeave: ()=>setIsHovered(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-64 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: image || "/placeholder.svg",
                        alt: title,
                        fill: true,
                        className: "object-cover"
                    }, void 0, false, {
                        fileName: "[project]/app/landing/stats-section.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[#026FB4]/70"
                    }, void 0, false, {
                        fileName: "[project]/app/landing/stats-section.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/landing/stats-section.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 p-6 flex flex-col text-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h3, {
                        className: "text-3xl font-bold mb-2",
                        children: count
                    }, void 0, false, {
                        fileName: "[project]/app/landing/stats-section.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-xl font-medium mb-4",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/landing/stats-section.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mb-6",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/app/landing/stats-section.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/landing/stats-section.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/landing/stats-section.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
};
_s(StatCard, "FPQn8a98tPjpohC7NUYORQR8GJE=");
_c = StatCard;
function StatsSection() {
    const stats = [
        {
            count: "350+",
            title: "Participants",
            description: "Join over 350 passionate individuals from across sectors who are coming together to shape the future of skills development. From educators and students to innovators and policymakers, our participants represent a vibrant mix of experiences and insights. Their active engagement fuels meaningful dialogue and cross-sector collaboration throughout the forum.",
            image: "/LOREM.png"
        },
        {
            count: "30+",
            title: "Speakers",
            description: "Our lineup of over 30 distinguished speakers includes thought leaders, industry experts, government officials, and education pioneers. Each speaker brings valuable knowledge and real-world experience to the stage, delivering impactful presentations and guiding discussions that challenge thinking and inspire action.",
            image: "/speakers.jpg"
        },
        {
            count: "43",
            title: "countries represented",
            description: "With representatives from 43 countries across Africa and beyond, the forum is a truly global event. This diverse international presence fosters cultural exchange, promotes inclusive perspectives, and highlights innovative practices from around the world—all aimed at advancing technical and vocational education.",
            image: "/countries.jpg"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-16 px-4 sm:px-6 lg:px-8 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold text-gray-900 mb-4",
                            children: "GLOBAL SKILLS CONNECT"
                        }, void 0, false, {
                            fileName: "[project]/app/landing/stats-section.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-gray-700 mb-6",
                                    children: "The Rwanda FutureSkills Forum 2025 combines three major events — TVET Expo, Global Skills Connect 2025, and an Inter Ministerial Summit - into one comprehensive platform. This integration aims to create stronger synergies between TVET, the Private Sector and the Government, ensuring a more effective and impactful skills development agenda at regional level."
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/stats-section.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-gray-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Rwanda Future Skills Forum objectives include:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/landing/stats-section.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/landing/stats-section.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this),
                                        "To provide a strategic response to the skills development challenges in Africa and across key economic sectors; promote TVET at national and international level; enable the establishment of strong partnership between TVET providers and industries; and facilitate a sustainable adaptation of the skills development process."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/landing/stats-section.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/landing/stats-section.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/landing/stats-section.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: stats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            count: stat.count,
                            title: stat.title,
                            description: stat.description,
                            image: stat.image
                        }, index, false, {
                            fileName: "[project]/app/landing/stats-section.tsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/landing/stats-section.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/landing/stats-section.tsx",
            lineNumber: 101,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/landing/stats-section.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_c1 = StatsSection;
var _c, _c1;
__turbopack_context__.k.register(_c, "StatCard");
__turbopack_context__.k.register(_c1, "StatsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/landing/footer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Footer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// import { useState } from "react";
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"use client";
;
;
;
function Footer() {
    // const [email, setEmail] = useState("");
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const [isSubmitted, setIsSubmitted] = useState(false);
    // const handleSubmit = (e: React.FormEvent) => {
    //   e.preventDefault();
    //   if (!email) return;
    //   setIsSubmitting(true);
    //   console.log(isSubmitting);
    //   // Simulate API call
    //   setTimeout(() => {
    //     setIsSubmitting(false);
    //     setIsSubmitted(true);
    //     console.log(isSubmitted);
    //     setEmail("");
    //     // Reset success message after 3 seconds
    //     setTimeout(() => {
    //       setIsSubmitted(false);
    //     }, 3000);
    //   }, 1000);
    // };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-white py-12 px-4 sm:px-6 lg:px-8 border-t",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-48 h-16 relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/eac.jpeg",
                                    alt: "Rwanda FutureSkills Forum Logo",
                                    width: 192,
                                    height: 64,
                                    className: "object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/footer.tsx",
                                    lineNumber: 42,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/landing/footer.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 pt-4",
                                                children: "Call Us"
                                            }, void 0, false, {
                                                fileName: "[project]/app/landing/footer.tsx",
                                                lineNumber: 53,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
                                                href: "tel:+250792401576",
                                                className: "text-lg font-medium text-gray-900 hover:text-[#026FB4] transition-colors",
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                children: "+250 788 424 208"
                                            }, void 0, false, {
                                                fileName: "[project]/app/landing/footer.tsx",
                                                lineNumber: 56,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/landing/footer.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-medium text-gray-500 uppercase tracking-wider mb-2",
                                                children: "Email Us"
                                            }, void 0, false, {
                                                fileName: "[project]/app/landing/footer.tsx",
                                                lineNumber: 66,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
                                                href: "mailto:rwandafutureskillsforum@rtb.gov.rw",
                                                className: "text-lg font-medium text-gray-900 hover:text-[#026FB4] transition-colors break-all",
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                children: "rwandafutureskillsforum@rtb.gov.rw"
                                            }, void 0, false, {
                                                fileName: "[project]/app/landing/footer.tsx",
                                                lineNumber: 69,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/landing/footer.tsx",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/landing/footer.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/landing/footer.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/landing/footer.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12 pt-8 border-t border-gray-200 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500",
                        children: "© 2025 Rwanda FutureSkills Forum"
                    }, void 0, false, {
                        fileName: "[project]/app/landing/footer.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/landing/footer.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/landing/footer.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/landing/footer.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/config.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Backend URL configuration
__turbopack_context__.s({
    "BACKEND_URL": (()=>BACKEND_URL),
    "getApiUrl": (()=>getApiUrl)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const BACKEND_URL = ("TURBOPACK compile-time value", "https://api.rwandafutureskillsforum.rtbdev.online");
const getApiUrl = (endpoint)=>{
    return `${BACKEND_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/landing/speakers.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// "use client";
// import type React from "react";
// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import { BACKEND_URL } from "@/lib/config";
// import Image from "next/image";
// interface Speaker {
//   id: string;
//   name: string;
//   position: string;
//   shortDescription: string;
//   biography: string;
//   status: string;
//   published: boolean;
//   profile_picture_url: string | null;
// }
// export default function SpeakersPage() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [speakers, setSpeakers] = useState<Speaker[]>([]);
//   const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   useEffect(() => {
//     const fetchSpeakers = async () => {
//       try {
//         const response = await fetch(`${BACKEND_URL}/speakers/getAllSpeakers`, {
//           method: "GET",
//           headers: {
//             accept: "*/*",
//           },
//         });
//         if (!response.ok) {
//           throw new Error(`API error: ${response.status}`);
//         }
//         const data = await response.json();
//         // Filter only published speakers
//         const publishedSpeakers = data.filter(
//           (speaker: Speaker) => speaker.published
//         );
//         setSpeakers(publishedSpeakers);
//       } catch (error) {
//         console.error("Failed to fetch speakers:", error);
//         setError("Failed to load speakers");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchSpeakers();
//   }, []);
//   // Completely redesigned animated border effect
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//     // Store canvas dimensions to avoid null checks later
//     let canvasWidth = 0;
//     let canvasHeight = 0;
//     // Set canvas dimensions to match parent container
//     const resizeCanvas = () => {
//       const container = canvas.parentElement;
//       if (container) {
//         canvas.width = container.offsetWidth;
//         canvas.height = container.offsetHeight;
//         // Store dimensions for use in other functions
//         canvasWidth = canvas.width;
//         canvasHeight = canvas.height;
//       }
//     };
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);
//     // Particle class for animated dots
//     class Particle {
//       x: number;
//       y: number;
//       size: number;
//       speedX: number;
//       speedY: number;
//       color: string;
//       alpha: number;
//       targetX: number;
//       targetY: number;
//       stage: number;
//       progress: number;
//       constructor(
//         startX: number,
//         startY: number,
//         targetX: number,
//         targetY: number
//       ) {
//         this.x = startX;
//         this.y = startY;
//         this.size = Math.random() * 2 + 1;
//         this.speedX = 0;
//         this.speedY = 0;
//         // Different blue shades
//         const blueShades = [
//           "#026FB4",
//           "#00A9DE",
//           "#0288D1",
//           "#01579B",
//           "#039BE5",
//         ];
//         this.color = blueShades[Math.floor(Math.random() * blueShades.length)];
//         this.alpha = 1;
//         this.targetX = targetX;
//         this.targetY = targetY;
//         this.stage = 0; // 0: moving to target, 1: scattering
//         this.progress = 0;
//       }
//       update() {
//         if (this.stage === 0) {
//           // Move along path
//           this.progress += 0.01;
//           if (this.progress >= 1) {
//             // Reached target, start scattering
//             this.stage = 1;
//             this.speedX = (Math.random() - 0.5) * 2;
//             this.speedY = (Math.random() - 0.5) * 2;
//           } else {
//             // Linear interpolation for movement
//             this.x = this.x + (this.targetX - this.x) * 0.05;
//             this.y = this.y + (this.targetY - this.y) * 0.05;
//           }
//         } else {
//           // Scatter
//           this.x += this.speedX;
//           this.y += this.speedY;
//           // Fade out
//           this.alpha -= 0.02;
//           if (this.alpha < 0) this.alpha = 0;
//         }
//       }
//       draw(ctx: CanvasRenderingContext2D) {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fillStyle =
//           this.color +
//           Math.floor(this.alpha * 255)
//             .toString(16)
//             .padStart(2, "0");
//         ctx.fill();
//       }
//     }
//     // Line segment class for the border
//     class LineSegment {
//       startX: number;
//       startY: number;
//       endX: number;
//       endY: number;
//       width: number;
//       color: string;
//       speed: number;
//       progress: number;
//       maxProgress: number;
//       side: number;
//       direction: number;
//       constructor(
//         side: number,
//         position: number,
//         length: number,
//         direction: number,
//         width: number,
//         height: number
//       ) {
//         this.side = side; // 0: top, 1: right, 2: bottom, 3: left
//         this.direction = direction; // 1: forward, -1: backward
//         this.width = Math.random() * 3 + 2;
//         this.speed = Math.random() * 0.01 + 0.005;
//         this.progress = 0;
//         this.maxProgress = Math.random() * 0.4 + 0.6; // How much of the segment to show (60-100%)
//         // Different blue shades
//         const blueShades = ["#026FB4", "#00A9DE", "#0288D1"];
//         this.color = blueShades[Math.floor(Math.random() * blueShades.length)];
//         // Set start and end positions based on side
//         switch (side) {
//           case 0: // Top
//             this.startX = direction > 0 ? position : position + length;
//             this.startY = 0;
//             this.endX = direction > 0 ? position + length : position;
//             this.endY = 0;
//             break;
//           case 1: // Right
//             this.startX = width;
//             this.startY = direction > 0 ? position : position + length;
//             this.endX = width;
//             this.endY = direction > 0 ? position + length : position;
//             break;
//           case 2: // Bottom
//             this.startX =
//               direction > 0 ? width - position : width - position - length;
//             this.startY = height;
//             this.endX =
//               direction > 0 ? width - position - length : width - position;
//             this.endY = height;
//             break;
//           case 3: // Left
//             this.startX = 0;
//             this.startY =
//               direction > 0 ? height - position : height - position - length;
//             this.endX = 0;
//             this.endY =
//               direction > 0 ? height - position - length : height - position;
//             break;
//           default:
//             this.startX = 0;
//             this.startY = 0;
//             this.endX = 0;
//             this.endY = 0;
//         }
//       }
//       update() {
//         this.progress += this.speed;
//         if (this.progress > 1) {
//           this.progress = 0;
//         }
//       }
//       draw(ctx: CanvasRenderingContext2D) {
//         const visibleProgress = Math.min(this.progress, this.maxProgress);
//         const startProgress = Math.max(
//           0,
//           this.progress - (1 - this.maxProgress)
//         );
//         // Calculate visible portion of the line
//         let drawStartX, drawStartY, drawEndX, drawEndY;
//         if (this.direction > 0) {
//           drawStartX = this.startX + (this.endX - this.startX) * startProgress;
//           drawStartY = this.startY + (this.endY - this.startY) * startProgress;
//           drawEndX = this.startX + (this.endX - this.startX) * visibleProgress;
//           drawEndY = this.startY + (this.endY - this.startY) * visibleProgress;
//         } else {
//           drawStartX = this.endX + (this.startX - this.endX) * startProgress;
//           drawStartY = this.endY + (this.startY - this.endY) * startProgress;
//           drawEndX = this.endX + (this.startX - this.endX) * visibleProgress;
//           drawEndY = this.endY + (this.startY - this.endY) * visibleProgress;
//         }
//         ctx.beginPath();
//         ctx.moveTo(drawStartX, drawStartY);
//         ctx.lineTo(drawEndX, drawEndY);
//         ctx.lineWidth = this.width;
//         ctx.strokeStyle = this.color;
//         ctx.lineCap = "round";
//         ctx.stroke();
//       }
//     }
//     // Create particles and line segments
//     const particles: Particle[] = [];
//     const lineSegments: LineSegment[] = [];
//     // Create line segments for each side
//     const segmentsPerSide = 8;
//     const createLineSegments = () => {
//       lineSegments.length = 0;
//       for (let side = 0; side < 4; side++) {
//         const sideLength = side % 2 === 0 ? canvasWidth : canvasHeight;
//         for (let i = 0; i < segmentsPerSide; i++) {
//           const position = Math.random() * sideLength;
//           const length = Math.random() * 80 + 40;
//           const direction = Math.random() > 0.5 ? 1 : -1;
//           lineSegments.push(
//             new LineSegment(
//               side,
//               position,
//               length,
//               direction,
//               canvasWidth,
//               canvasHeight
//             )
//           );
//         }
//       }
//     };
//     createLineSegments();
//     // Function to create particles
//     const createParticles = (x: number, y: number, count: number) => {
//       for (let i = 0; i < count; i++) {
//         // Random position along the border
//         let targetX, targetY;
//         const side = Math.floor(Math.random() * 4);
//         switch (side) {
//           case 0: // Top
//             targetX = Math.random() * canvasWidth;
//             targetY = 0;
//             break;
//           case 1: // Right
//             targetX = canvasWidth;
//             targetY = Math.random() * canvasHeight;
//             break;
//           case 2: // Bottom
//             targetX = Math.random() * canvasWidth;
//             targetY = canvasHeight;
//             break;
//           case 3: // Left
//             targetX = 0;
//             targetY = Math.random() * canvasHeight;
//             break;
//           default:
//             targetX = 0;
//             targetY = 0;
//         }
//         particles.push(new Particle(x, y, targetX, targetY));
//       }
//     };
//     // Create initial particles
//     const centerX = canvasWidth / 2;
//     const centerY = canvasHeight / 2;
//     createParticles(centerX, centerY, 50);
//     // Animation loop
//     let animationFrameId: number;
//     let lastParticleTime = 0;
//     const animate = (timestamp: number) => {
//       ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//       // Create new particles periodically
//       if (timestamp - lastParticleTime > 500) {
//         // Every 500ms
//         createParticles(centerX, centerY, 10);
//         lastParticleTime = timestamp;
//       }
//       // Draw subtle border
//       ctx.beginPath();
//       ctx.rect(0, 0, canvasWidth, canvasHeight);
//       ctx.lineWidth = 1;
//       ctx.strokeStyle = "#026FB440"; // Semi-transparent blue
//       ctx.stroke();
//       // Update and draw line segments
//       lineSegments.forEach((segment) => {
//         segment.update();
//         segment.draw(ctx);
//       });
//       // Update and draw particles
//       for (let i = particles.length - 1; i >= 0; i--) {
//         particles[i].update();
//         particles[i].draw(ctx);
//         // Remove faded particles
//         if (particles[i].alpha <= 0) {
//           particles.splice(i, 1);
//         }
//       }
//       animationFrameId = requestAnimationFrame(animate);
//     };
//     animationFrameId = requestAnimationFrame(animate);
//     // Handle window resize
//     const handleResize = () => {
//       resizeCanvas();
//       // Only recreate line segments if canvas exists
//       if (canvas) {
//         createLineSegments();
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);
//   // Function to assign colors to speakers in rotation
//   const getSpeakerColor = (index: number) => {
//     const colors = ["#23AF57", "#EC2227", "#00A9DE"]; // Green, Red, Blue
//     return colors[index % colors.length];
//   };
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#026FB4]"></div>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }
//   return (
//     <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900">
//             Meet The Speakers
//           </h1>
//         </div>
//         <div className="relative p-8 mb-12 min-h-[600px]">
//           {/* Animated border canvas */}
//           <canvas
//             ref={canvasRef}
//             className="absolute inset-0 w-full h-full pointer-events-none"
//           />
//           {/* Speakers grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
//             {speakers.map((speaker, index) => (
//               <SpeakerCard
//                 key={speaker.id}
//                 speaker={speaker}
//                 color={getSpeakerColor(index)}
//                 onClick={() => setSelectedSpeaker(speaker)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       {/* Speaker Modal */}
//       <AnimatePresence>
//         {selectedSpeaker && (
//           <SpeakerModal
//             speaker={selectedSpeaker}
//             onClose={() => setSelectedSpeaker(null)}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
// interface SpeakerCardProps {
//   speaker: Speaker;
//   color: string;
//   onClick: () => void;
// }
// function SpeakerCard({ speaker, color, onClick }: SpeakerCardProps) {
//   // Create rgba color with 10% opacity for background
//   const rgbaBackground = `${color}1A`; // 1A is 10% opacity in hex
//   // Create border gradient style
//   const borderGradient = {
//     borderWidth: "1.17px",
//     borderStyle: "solid",
//     borderImage: `linear-gradient(to right, ${color} 0%, ${color} 100%) 1`,
//     borderRadius: "16px", // Added border radius
//   };
//   return (
//     <motion.div
//       className="rounded-2xl overflow-hidden h-full cursor-pointer" // Added cursor-pointer
//       style={{
//         backgroundColor: rgbaBackground,
//         ...borderGradient,
//       }}
//       whileHover={{
//         scale: 1.05,
//         boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//         transition: { duration: 0.3 },
//       }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       onClick={onClick}
//     >
//       <div className="p-6 flex flex-col items-center text-center">
//         <div
//           className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2"
//           style={{ borderColor: color }}
//         >
//           <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
//             <Image
//               src={
//                 speaker.profile_picture_url ||
//                 "/placeholder.svg?height=200&width=200"
//               }
//               alt={`${speaker.name}`}
//               className="w-full h-full object-cover"
//               width={128}
//               height={128}
//               unoptimized={speaker.profile_picture_url?.startsWith(
//                 "/placeholder"
//               )}
//             />
//           </div>
//         </div>
//         <h3 className="text-lg font-medium text-gray-900 mb-1">
//           {speaker.name}
//         </h3>
//         <p className="text-sm text-gray-500 mb-1">{speaker.position}</p>
//         <p className="text-sm text-gray-600">{speaker.shortDescription}</p>
//       </div>
//     </motion.div>
//   );
// }
// interface SpeakerModalProps {
//   speaker: Speaker;
//   onClose: () => void;
// }
// function SpeakerModal({ speaker, onClose }: SpeakerModalProps) {
//   // Close modal when clicking outside
//   const modalRef = useRef<HTMLDivElement>(null);
//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
//       onClose();
//     }
//   };
//   // Close on escape key
//   useEffect(() => {
//     const handleEscKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         onClose();
//       }
//     };
//     document.addEventListener("keydown", handleEscKey);
//     return () => document.removeEventListener("keydown", handleEscKey);
//   }, [onClose]);
//   return (
//     <motion.div
//       className="fixed inset-0 bg-[#00000070] z-50 flex items-center justify-center p-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={handleBackdropClick}
//     >
//       <motion.div
//         ref={modalRef}
//         className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden"
//         initial={{ scale: 0.9, y: 20 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.9, y: 20 }}
//         transition={{ type: "spring", damping: 25 }}
//       >
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
//           aria-label="Close"
//         >
//           <X size={20} />
//         </button>
//         <div className="p-6 flex flex-col items-center">
//           {/* Speaker image */}
//           <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-2 border-[#026FB4]">
//             <Image
//               src={
//                 speaker.profile_picture_url ||
//                 "/placeholder.svg?height=200&width=200"
//               }
//               alt={`${speaker.name}`}
//               className="w-full h-full object-cover"
//               width={128}
//               height={128}
//               unoptimized={speaker.profile_picture_url?.startsWith(
//                 "/placeholder"
//               )}
//             />
//           </div>
//           {/* Speaker info */}
//           <h3 className="text-xl font-bold text-gray-900 mb-1">
//             {speaker.name}
//           </h3>
//           <p className="text-md text-gray-700 mb-1">{speaker.position}</p>
//           <p className="text-sm text-gray-600 mb-4">
//             {speaker.shortDescription}
//           </p>
//           {/* Speaker bio */}
//           <p className="text-gray-700 text-center">{speaker.biography}</p>
//           {/* Close button */}
//           <button
//             onClick={onClose}
//             className="mt-6 px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }
__turbopack_context__.s({
    "default": (()=>SpeakersPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function SpeakersPage() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const borderCanvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [speakers, setSpeakers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedSpeaker, setSelectedSpeaker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Pagination state
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const speakersPerPage = 8 // 2 rows of 4 speakers
    ;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpeakersPage.useEffect": ()=>{
            const fetchSpeakers = {
                "SpeakersPage.useEffect.fetchSpeakers": async ()=>{
                    try {
                        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_URL"]}/speakers/getAllSpeakers`, {
                            method: "GET",
                            headers: {
                                accept: "*/*"
                            }
                        });
                        if (!response.ok) {
                            throw new Error(`API error: ${response.status}`);
                        }
                        const data = await response.json();
                        // Filter only published speakers
                        const publishedSpeakers = data.filter({
                            "SpeakersPage.useEffect.fetchSpeakers.publishedSpeakers": (speaker)=>speaker.published
                        }["SpeakersPage.useEffect.fetchSpeakers.publishedSpeakers"]);
                        setSpeakers(publishedSpeakers);
                    } catch (error) {
                        console.error("Failed to fetch speakers:", error);
                        setError("Failed to load speakers");
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["SpeakersPage.useEffect.fetchSpeakers"];
            fetchSpeakers();
        }
    }["SpeakersPage.useEffect"], []);
    // Enhanced animated border effect with more dynamic elements
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpeakersPage.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            // Store canvas dimensions to avoid null checks later
            let canvasWidth = 0;
            let canvasHeight = 0;
            // Set canvas dimensions to match parent container
            const resizeCanvas = {
                "SpeakersPage.useEffect.resizeCanvas": ()=>{
                    const container = canvas.parentElement;
                    if (container) {
                        canvas.width = container.offsetWidth;
                        canvas.height = container.offsetHeight;
                        // Store dimensions for use in other functions
                        canvasWidth = canvas.width;
                        canvasHeight = canvas.height;
                    }
                }
            }["SpeakersPage.useEffect.resizeCanvas"];
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);
            // Particle class for animated dots
            class Particle {
                x;
                y;
                size;
                speedX;
                speedY;
                color;
                alpha;
                targetX;
                targetY;
                stage;
                progress;
                constructor(startX, startY, targetX, targetY){
                    this.x = startX;
                    this.y = startY;
                    this.size = Math.random() * 2 + 1;
                    this.speedX = 0;
                    this.speedY = 0;
                    // Enhanced color palette with more vibrant blues
                    const blueShades = [
                        "#026FB4",
                        "#00A9DE",
                        "#0288D1",
                        "#01579B",
                        "#039BE5",
                        "#29B6F6"
                    ];
                    this.color = blueShades[Math.floor(Math.random() * blueShades.length)];
                    this.alpha = 1;
                    this.targetX = targetX;
                    this.targetY = targetY;
                    this.stage = 0 // 0: moving to target, 1: scattering
                    ;
                    this.progress = 0;
                }
                update() {
                    if (this.stage === 0) {
                        // Move along path with improved easing
                        this.progress += 0.01;
                        if (this.progress >= 1) {
                            // Reached target, start scattering
                            this.stage = 1;
                            this.speedX = (Math.random() - 0.5) * 3 // Increased speed
                            ;
                            this.speedY = (Math.random() - 0.5) * 3;
                        } else {
                            // Improved easing for smoother movement
                            const ease = {
                                "SpeakersPage.useEffect.ease": (t)=>t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
                            }["SpeakersPage.useEffect.ease"];
                            // Apply easing to the movement
                            this.x = this.x + (this.targetX - this.x) * (0.05 * ease(this.progress));
                            this.y = this.y + (this.targetY - this.y) * (0.05 * ease(this.progress));
                        }
                    } else {
                        // Scatter with slight acceleration
                        this.speedX *= 1.01;
                        this.speedY *= 1.01;
                        this.x += this.speedX;
                        this.y += this.speedY;
                        // Fade out
                        this.alpha -= 0.02;
                        if (this.alpha < 0) this.alpha = 0;
                    }
                }
                draw(ctx) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color + Math.floor(this.alpha * 255).toString(16).padStart(2, "0");
                    ctx.fill();
                }
            }
            // Enhanced line segment class for the border
            class LineSegment {
                startX;
                startY;
                endX;
                endY;
                width;
                color;
                speed;
                progress;
                maxProgress;
                side;
                direction;
                glow;
                constructor(side, position, length, direction, width, height){
                    this.side = side // 0: top, 1: right, 2: bottom, 3: left
                    ;
                    this.direction = direction // 1: forward, -1: backward
                    ;
                    this.width = Math.random() * 3 + 2;
                    this.speed = Math.random() * 0.01 + 0.005;
                    this.progress = Math.random() // Random starting position
                    ;
                    this.maxProgress = Math.random() * 0.4 + 0.6 // How much of the segment to show (60-100%)
                    ;
                    this.glow = Math.random() > 0.7 // Some lines will glow
                    ;
                    // Enhanced blue shades with more variety
                    const blueShades = [
                        "#026FB4",
                        "#00A9DE",
                        "#0288D1",
                        "#29B6F6",
                        "#4FC3F7"
                    ];
                    this.color = blueShades[Math.floor(Math.random() * blueShades.length)];
                    // Set start and end positions based on side
                    switch(side){
                        case 0:
                            this.startX = direction > 0 ? position : position + length;
                            this.startY = 0;
                            this.endX = direction > 0 ? position + length : position;
                            this.endY = 0;
                            break;
                        case 1:
                            this.startX = width;
                            this.startY = direction > 0 ? position : position + length;
                            this.endX = width;
                            this.endY = direction > 0 ? position + length : position;
                            break;
                        case 2:
                            this.startX = direction > 0 ? width - position : width - position - length;
                            this.startY = height;
                            this.endX = direction > 0 ? width - position - length : width - position;
                            this.endY = height;
                            break;
                        case 3:
                            this.startX = 0;
                            this.startY = direction > 0 ? height - position : height - position - length;
                            this.endX = 0;
                            this.endY = direction > 0 ? height - position - length : height - position;
                            break;
                        default:
                            this.startX = 0;
                            this.startY = 0;
                            this.endX = 0;
                            this.endY = 0;
                    }
                }
                update() {
                    this.progress += this.speed;
                    if (this.progress > 1) {
                        this.progress = 0;
                        // Occasionally change color when restarting
                        if (Math.random() > 0.7) {
                            const blueShades = [
                                "#026FB4",
                                "#00A9DE",
                                "#0288D1",
                                "#29B6F6",
                                "#4FC3F7"
                            ];
                            this.color = blueShades[Math.floor(Math.random() * blueShades.length)];
                            this.glow = Math.random() > 0.7;
                        }
                    }
                }
                draw(ctx) {
                    const visibleProgress = Math.min(this.progress, this.maxProgress);
                    const startProgress = Math.max(0, this.progress - (1 - this.maxProgress));
                    // Calculate visible portion of the line
                    let drawStartX, drawStartY, drawEndX, drawEndY;
                    if (this.direction > 0) {
                        drawStartX = this.startX + (this.endX - this.startX) * startProgress;
                        drawStartY = this.startY + (this.endY - this.startY) * startProgress;
                        drawEndX = this.startX + (this.endX - this.startX) * visibleProgress;
                        drawEndY = this.startY + (this.endY - this.startY) * visibleProgress;
                    } else {
                        drawStartX = this.endX + (this.startX - this.endX) * startProgress;
                        drawStartY = this.endY + (this.startY - this.endY) * startProgress;
                        drawEndX = this.endX + (this.startX - this.endX) * visibleProgress;
                        drawEndY = this.endY + (this.startY - this.endY) * visibleProgress;
                    }
                    // Add glow effect to some lines
                    if (this.glow) {
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = this.color;
                    } else {
                        ctx.shadowBlur = 0;
                    }
                    ctx.beginPath();
                    ctx.moveTo(drawStartX, drawStartY);
                    ctx.lineTo(drawEndX, drawEndY);
                    ctx.lineWidth = this.width;
                    ctx.strokeStyle = this.color;
                    ctx.lineCap = "round";
                    ctx.stroke();
                    // Reset shadow
                    ctx.shadowBlur = 0;
                }
            }
            // Create particles and line segments
            const particles = [];
            const lineSegments = [];
            // Floating dots class for background effect
            class FloatingDot {
                x;
                y;
                size;
                speedX;
                speedY;
                color;
                alpha;
                constructor(){
                    this.x = Math.random() * canvasWidth;
                    this.y = Math.random() * canvasHeight;
                    this.size = Math.random() * 1.5 + 0.5;
                    this.speedX = (Math.random() - 0.5) * 0.3;
                    this.speedY = (Math.random() - 0.5) * 0.3;
                    this.alpha = Math.random() * 0.5 + 0.1;
                    this.color = "#026FB4";
                }
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    // Bounce off edges
                    if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
                    if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;
                    // Pulsate alpha
                    this.alpha += Math.sin(Date.now() * 0.001) * 0.01;
                    this.alpha = Math.max(0.1, Math.min(0.6, this.alpha));
                }
                draw(ctx) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color + Math.floor(this.alpha * 255).toString(16).padStart(2, "0");
                    ctx.fill();
                }
            }
            const floatingDots = [];
            for(let i = 0; i < 50; i++){
                floatingDots.push(new FloatingDot());
            }
            // Create line segments for each side
            const segmentsPerSide = 10 // Increased number of segments
            ;
            const createLineSegments = {
                "SpeakersPage.useEffect.createLineSegments": ()=>{
                    lineSegments.length = 0;
                    for(let side = 0; side < 4; side++){
                        const sideLength = side % 2 === 0 ? canvasWidth : canvasHeight;
                        for(let i = 0; i < segmentsPerSide; i++){
                            const position = Math.random() * sideLength;
                            const length = Math.random() * 100 + 50 // Longer segments
                            ;
                            const direction = Math.random() > 0.5 ? 1 : -1;
                            lineSegments.push(new LineSegment(side, position, length, direction, canvasWidth, canvasHeight));
                        }
                    }
                }
            }["SpeakersPage.useEffect.createLineSegments"];
            createLineSegments();
            // Function to create particles
            const createParticles = {
                "SpeakersPage.useEffect.createParticles": (x, y, count)=>{
                    for(let i = 0; i < count; i++){
                        // Random position along the border
                        let targetX, targetY;
                        const side = Math.floor(Math.random() * 4);
                        switch(side){
                            case 0:
                                targetX = Math.random() * canvasWidth;
                                targetY = 0;
                                break;
                            case 1:
                                targetX = canvasWidth;
                                targetY = Math.random() * canvasHeight;
                                break;
                            case 2:
                                targetX = Math.random() * canvasWidth;
                                targetY = canvasHeight;
                                break;
                            case 3:
                                targetX = 0;
                                targetY = Math.random() * canvasHeight;
                                break;
                            default:
                                targetX = 0;
                                targetY = 0;
                        }
                        particles.push(new Particle(x, y, targetX, targetY));
                    }
                }
            }["SpeakersPage.useEffect.createParticles"];
            // Create initial particles
            const centerX = canvasWidth / 2;
            const centerY = canvasHeight / 2;
            createParticles(centerX, centerY, 80) // More initial particles
            ;
            // Animation loop
            let animationFrameId;
            let lastParticleTime = 0;
            const animate = {
                "SpeakersPage.useEffect.animate": (timestamp)=>{
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    // Draw floating background dots
                    floatingDots.forEach({
                        "SpeakersPage.useEffect.animate": (dot)=>{
                            dot.update();
                            dot.draw(ctx);
                        }
                    }["SpeakersPage.useEffect.animate"]);
                    // Create new particles periodically
                    if (timestamp - lastParticleTime > 400) {
                        // More frequent particles
                        createParticles(centerX, centerY, 15);
                        lastParticleTime = timestamp;
                    }
                    // Draw subtle border with gradient
                    ctx.beginPath();
                    ctx.rect(0, 0, canvasWidth, canvasHeight);
                    ctx.lineWidth = 1;
                    // Create gradient border
                    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
                    gradient.addColorStop(0, "#026FB440");
                    gradient.addColorStop(0.5, "#00A9DE40");
                    gradient.addColorStop(1, "#0288D140");
                    ctx.strokeStyle = gradient;
                    ctx.stroke();
                    // Update and draw line segments
                    lineSegments.forEach({
                        "SpeakersPage.useEffect.animate": (segment)=>{
                            segment.update();
                            segment.draw(ctx);
                        }
                    }["SpeakersPage.useEffect.animate"]);
                    // Update and draw particles
                    for(let i = particles.length - 1; i >= 0; i--){
                        particles[i].update();
                        particles[i].draw(ctx);
                        // Remove faded particles
                        if (particles[i].alpha <= 0) {
                            particles.splice(i, 1);
                        }
                    }
                    animationFrameId = requestAnimationFrame(animate);
                }
            }["SpeakersPage.useEffect.animate"];
            animationFrameId = requestAnimationFrame(animate);
            // Handle window resize
            const handleResize = {
                "SpeakersPage.useEffect.handleResize": ()=>{
                    resizeCanvas();
                    // Only recreate line segments if canvas exists
                    if (canvas) {
                        createLineSegments();
                    }
                }
            }["SpeakersPage.useEffect.handleResize"];
            window.addEventListener("resize", handleResize);
            return ({
                "SpeakersPage.useEffect": ()=>{
                    window.removeEventListener("resize", handleResize);
                    cancelAnimationFrame(animationFrameId);
                }
            })["SpeakersPage.useEffect"];
        }
    }["SpeakersPage.useEffect"], []);
    // Main container border animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpeakersPage.useEffect": ()=>{
            const canvas = borderCanvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            // Store canvas dimensions
            let canvasWidth = 0;
            let canvasHeight = 0;
            // Set canvas dimensions to match parent container
            const resizeCanvas = {
                "SpeakersPage.useEffect.resizeCanvas": ()=>{
                    const container = canvas.parentElement;
                    if (container) {
                        // Make canvas slightly larger than container to ensure border is visible
                        canvas.width = container.offsetWidth;
                        canvas.height = container.offsetHeight;
                        canvasWidth = canvas.width;
                        canvasHeight = canvas.height;
                    }
                }
            }["SpeakersPage.useEffect.resizeCanvas"];
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);
            // Brand colors
            const brandColors = [
                "#23AF57",
                "#EC2227",
                "#00A9DE"
            ] // Green, Red, Blue
            ;
            // Border light class
            class BorderLight {
                x;
                y;
                size;
                speed;
                color;
                progress;
                clockwise;
                glowSize;
                pulseSpeed;
                pulsePhase;
                constructor(){
                    this.clockwise = Math.random() > 0.5;
                    this.progress = Math.random();
                    this.speed = Math.random() * 0.002 + 0.0005;
                    this.size = Math.random() * 4 + 3;
                    this.glowSize = Math.random() * 25 + 15;
                    this.pulseSpeed = Math.random() * 0.05 + 0.02;
                    this.pulsePhase = Math.random() * Math.PI * 2;
                    this.color = brandColors[Math.floor(Math.random() * brandColors.length)];
                    // Initialize position
                    this.updatePosition();
                }
                updatePosition() {
                    const padding = 0 // Distance from the edge
                    ;
                    // Calculate position along the perimeter
                    const perimeter = 2 * (canvasWidth + canvasHeight);
                    const distance = this.progress * perimeter;
                    // Top edge
                    if (distance < canvasWidth) {
                        this.x = distance;
                        this.y = padding;
                    } else if (distance < canvasWidth + canvasHeight) {
                        this.x = canvasWidth - padding;
                        this.y = distance - canvasWidth;
                    } else if (distance < 2 * canvasWidth + canvasHeight) {
                        this.x = canvasWidth - (distance - canvasWidth - canvasHeight);
                        this.y = canvasHeight - padding;
                    } else {
                        this.x = padding;
                        this.y = canvasHeight - (distance - 2 * canvasWidth - canvasHeight);
                    }
                }
                update() {
                    // Update progress along the path
                    this.progress += this.clockwise ? this.speed : -this.speed;
                    // Keep progress in [0, 1] range
                    if (this.progress > 1) this.progress -= 1;
                    if (this.progress < 0) this.progress += 1;
                    // Update position
                    this.updatePosition();
                    // Pulse the glow size
                    this.glowSize = (Math.sin(Date.now() * this.pulseSpeed + this.pulsePhase) + 1) * 15 + 10;
                }
                draw(ctx) {
                    // Create radial gradient for glow effect
                    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowSize);
                    gradient.addColorStop(0, this.color + "FF") // Full opacity at center
                    ;
                    gradient.addColorStop(0.5, this.color + "80") // 50% opacity
                    ;
                    gradient.addColorStop(1, this.color + "00") // Transparent at edge
                    ;
                    // Draw glow
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                    // Draw core
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fill();
                }
            }
            // Create border lights
            const borderLights = [];
            for(let i = 0; i < 30; i++){
                borderLights.push(new BorderLight());
            }
            // Animation loop
            let animationFrameId;
            const animate = {
                "SpeakersPage.useEffect.animate": ()=>{
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    // Draw border
                    ctx.beginPath();
                    ctx.rect(0, 0, canvasWidth, canvasHeight);
                    ctx.lineWidth = 6 // Thicker border
                    ;
                    // Create gradient for border
                    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
                    gradient.addColorStop(0, "#23AF5780") // Green with 50% opacity
                    ;
                    gradient.addColorStop(0.33, "#EC222780") // Red with 50% opacity
                    ;
                    gradient.addColorStop(0.66, "#00A9DE80") // Blue with 50% opacity
                    ;
                    gradient.addColorStop(1, "#23AF5780") // Back to green
                    ;
                    ctx.strokeStyle = gradient;
                    // Add glow to the border
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = "#00A9DE";
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                    // Update and draw border lights
                    borderLights.forEach({
                        "SpeakersPage.useEffect.animate": (light)=>{
                            light.update();
                            light.draw(ctx);
                        }
                    }["SpeakersPage.useEffect.animate"]);
                    animationFrameId = requestAnimationFrame(animate);
                }
            }["SpeakersPage.useEffect.animate"];
            animationFrameId = requestAnimationFrame(animate);
            // Handle window resize
            window.addEventListener("resize", resizeCanvas);
            return ({
                "SpeakersPage.useEffect": ()=>{
                    window.removeEventListener("resize", resizeCanvas);
                    cancelAnimationFrame(animationFrameId);
                }
            })["SpeakersPage.useEffect"];
        }
    }["SpeakersPage.useEffect"], []);
    // Function to assign colors to speakers in rotation
    const getSpeakerColor = (index)=>{
        const colors = [
            "#23AF57",
            "#EC2227",
            "#00A9DE"
        ] // Green, Red, Blue
        ;
        return colors[index % colors.length];
    };
    // Calculate pagination
    const indexOfLastSpeaker = currentPage * speakersPerPage;
    const indexOfFirstSpeaker = indexOfLastSpeaker - speakersPerPage;
    const currentSpeakers = speakers.slice(indexOfFirstSpeaker, indexOfLastSpeaker);
    const totalPages = Math.ceil(speakers.length / speakersPerPage);
    // Pagination controls
    const nextPage = ()=>{
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const prevPage = ()=>{
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const goToPage = (pageNumber)=>{
        setCurrentPage(pageNumber);
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-[#026FB4]"
            }, void 0, false, {
                fileName: "[project]/app/landing/speakers.tsx",
                lineNumber: 1301,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/landing/speakers.tsx",
            lineNumber: 1300,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-red-500",
                children: error
            }, void 0, false, {
                fileName: "[project]/app/landing/speakers.tsx",
                lineNumber: 1309,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/landing/speakers.tsx",
            lineNumber: 1308,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-bold text-gray-900",
                                children: "Meet The Speakers"
                            }, void 0, false, {
                                fileName: "[project]/app/landing/speakers.tsx",
                                lineNumber: 1318,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-lg text-gray-600 max-w-2xl mx-auto",
                                children: "Learn from industry experts and thought leaders who are shaping the future"
                            }, void 0, false, {
                                fileName: "[project]/app/landing/speakers.tsx",
                                lineNumber: 1319,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/landing/speakers.tsx",
                        lineNumber: 1317,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative p-8 mb-8 min-h-[600px] bg-white rounded-xl overflow-hidden shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                ref: borderCanvasRef,
                                className: "absolute inset-0 w-full h-full pointer-events-none z-20",
                                style: {
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/landing/speakers.tsx",
                                lineNumber: 1327,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                ref: canvasRef,
                                className: "absolute inset-0 w-full h-full pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/app/landing/speakers.tsx",
                                lineNumber: 1334,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "wait",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -20
                                    },
                                    transition: {
                                        duration: 0.5
                                    },
                                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10",
                                    children: currentSpeakers.map((speaker, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SpeakerCard, {
                                            speaker: speaker,
                                            color: getSpeakerColor(indexOfFirstSpeaker + index),
                                            onClick: ()=>setSelectedSpeaker(speaker)
                                        }, speaker.id, false, {
                                            fileName: "[project]/app/landing/speakers.tsx",
                                            lineNumber: 1347,
                                            columnNumber: 17
                                        }, this))
                                }, currentPage, false, {
                                    fileName: "[project]/app/landing/speakers.tsx",
                                    lineNumber: 1338,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/landing/speakers.tsx",
                                lineNumber: 1337,
                                columnNumber: 11
                            }, this),
                            speakers.length > speakersPerPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-12 flex justify-center items-center space-x-2 relative z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: prevPage,
                                        disabled: currentPage === 1,
                                        className: `p-2 rounded-full ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`,
                                        "aria-label": "Previous page",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/app/landing/speakers.tsx",
                                            lineNumber: 1368,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/landing/speakers.tsx",
                                        lineNumber: 1360,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-2",
                                        children: Array.from({
                                            length: totalPages
                                        }, (_, i)=>i + 1).map((page)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>goToPage(page),
                                                className: `w-8 h-8 rounded-full flex items-center justify-center ${currentPage === page ? "bg-[#026FB4] text-white" : "text-gray-700 hover:bg-gray-100"}`,
                                                "aria-label": `Page ${page}`,
                                                "aria-current": currentPage === page ? "page" : undefined,
                                                children: page
                                            }, page, false, {
                                                fileName: "[project]/app/landing/speakers.tsx",
                                                lineNumber: 1373,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/landing/speakers.tsx",
                                        lineNumber: 1371,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: nextPage,
                                        disabled: currentPage === totalPages,
                                        className: `p-2 rounded-full ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`,
                                        "aria-label": "Next page",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/app/landing/speakers.tsx",
                                            lineNumber: 1395,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/landing/speakers.tsx",
                                        lineNumber: 1387,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/landing/speakers.tsx",
                                lineNumber: 1359,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/landing/speakers.tsx",
                        lineNumber: 1325,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/landing/speakers.tsx",
                lineNumber: 1316,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: selectedSpeaker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SpeakerModal, {
                    speaker: selectedSpeaker,
                    onClose: ()=>setSelectedSpeaker(null)
                }, void 0, false, {
                    fileName: "[project]/app/landing/speakers.tsx",
                    lineNumber: 1404,
                    columnNumber: 29
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/landing/speakers.tsx",
                lineNumber: 1403,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/landing/speakers.tsx",
        lineNumber: 1315,
        columnNumber: 5
    }, this);
}
_s(SpeakersPage, "T/BMsa/VWozfokgoYZKZEi1qVBk=");
_c = SpeakersPage;
function SpeakerCard({ speaker, color, onClick }) {
    // Create rgba color with 10% opacity for background
    const rgbaBackground = `${color}1A` // 1A is 10% opacity in hex
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "rounded-2xl overflow-hidden h-full cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300",
        style: {
            backgroundColor: rgbaBackground,
            borderWidth: "1.5px",
            borderStyle: "solid",
            borderColor: color,
            borderRadius: "16px"
        },
        whileHover: {
            scale: 1.03,
            transition: {
                duration: 0.3
            }
        },
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5
        },
        onClick: onClick,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 flex flex-col items-center text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-32 h-32 rounded-full overflow-hidden mb-4 border-2 relative",
                    style: {
                        borderColor: color
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-full rounded-full overflow-hidden bg-gray-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: speaker.profile_picture_url || "/placeholder.svg?height=200&width=200",
                                alt: `${speaker.name}`,
                                className: "w-full h-full object-cover",
                                width: 128,
                                height: 128,
                                unoptimized: speaker.profile_picture_url?.startsWith("/placeholder")
                            }, void 0, false, {
                                fileName: "[project]/app/landing/speakers.tsx",
                                lineNumber: 1442,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/landing/speakers.tsx",
                            lineNumber: 1441,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute inset-0 rounded-full",
                            style: {
                                border: `2px solid ${color}`,
                                opacity: 0.5
                            },
                            animate: {
                                scale: [
                                    1,
                                    1.1,
                                    1
                                ]
                            },
                            transition: {
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/landing/speakers.tsx",
                            lineNumber: 1452,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/landing/speakers.tsx",
                    lineNumber: 1440,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-medium text-gray-900 mb-1",
                    children: speaker.name
                }, void 0, false, {
                    fileName: "[project]/app/landing/speakers.tsx",
                    lineNumber: 1469,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-500 mb-1",
                    children: speaker.position
                }, void 0, false, {
                    fileName: "[project]/app/landing/speakers.tsx",
                    lineNumber: 1470,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-600 line-clamp-2",
                    children: speaker.shortDescription
                }, void 0, false, {
                    fileName: "[project]/app/landing/speakers.tsx",
                    lineNumber: 1471,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/landing/speakers.tsx",
            lineNumber: 1439,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/landing/speakers.tsx",
        lineNumber: 1421,
        columnNumber: 5
    }, this);
}
_c1 = SpeakerCard;
function SpeakerModal({ speaker, onClose }) {
    _s1();
    // Close modal when clicking outside
    const modalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleBackdropClick = (e)=>{
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };
    // Close on escape key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpeakerModal.useEffect": ()=>{
            const handleEscKey = {
                "SpeakerModal.useEffect.handleEscKey": (e)=>{
                    if (e.key === "Escape") {
                        onClose();
                    }
                }
            }["SpeakerModal.useEffect.handleEscKey"];
            document.addEventListener("keydown", handleEscKey);
            return ({
                "SpeakerModal.useEffect": ()=>document.removeEventListener("keydown", handleEscKey)
            })["SpeakerModal.useEffect"];
        }
    }["SpeakerModal.useEffect"], [
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "fixed inset-0 bg-[#00000070] z-50 flex items-center justify-center p-4",
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        onClick: handleBackdropClick,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            ref: modalRef,
            className: "bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden",
            initial: {
                scale: 0.9,
                y: 20
            },
            animate: {
                scale: 1,
                y: 0
            },
            exit: {
                scale: 0.9,
                y: 20
            },
            transition: {
                type: "spring",
                damping: 25
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-1.5 bg-gradient-to-r from-[#23AF57] via-[#EC2227] to-[#00A9DE]"
                }, void 0, false, {
                    fileName: "[project]/app/landing/speakers.tsx",
                    lineNumber: 1521,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors",
                    "aria-label": "Close",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/app/landing/speakers.tsx",
                        lineNumber: 1529,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/landing/speakers.tsx",
                    lineNumber: 1524,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 flex flex-col items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-24 h-24 md:w-32 md:h-32 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-full rounded-full overflow-hidden border-2 border-[#026FB4] relative z-10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: speaker.profile_picture_url || "/placeholder.svg?height=200&width=200",
                                        alt: `${speaker.name}`,
                                        className: "w-full h-full object-cover",
                                        width: 128,
                                        height: 128,
                                        unoptimized: speaker.profile_picture_url?.startsWith("/placeholder")
                                    }, void 0, false, {
                                        fileName: "[project]/app/landing/speakers.tsx",
                                        lineNumber: 1536,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/speakers.tsx",
                                    lineNumber: 1535,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "absolute inset-0 rounded-full",
                                    style: {
                                        border: "2px solid #23AF57",
                                        opacity: 0.3
                                    },
                                    animate: {
                                        scale: [
                                            1,
                                            1.15,
                                            1
                                        ]
                                    },
                                    transition: {
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/speakers.tsx",
                                    lineNumber: 1547,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "absolute inset-0 rounded-full",
                                    style: {
                                        border: "2px solid #EC2227",
                                        opacity: 0.2
                                    },
                                    animate: {
                                        scale: [
                                            1,
                                            1.3,
                                            1
                                        ]
                                    },
                                    transition: {
                                        duration: 4,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                        delay: 0.5
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/speakers.tsx",
                                    lineNumber: 1562,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "absolute inset-0 rounded-full",
                                    style: {
                                        border: "2px solid #00A9DE",
                                        opacity: 0.15
                                    },
                                    animate: {
                                        scale: [
                                            1,
                                            1.45,
                                            1
                                        ]
                                    },
                                    transition: {
                                        duration: 5,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                        delay: 1
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/landing/speakers.tsx",
                                    lineNumber: 1578,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/landing/speakers.tsx",
                            lineNumber: 1534,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold text-gray-900 mb-1",
                            children: speaker.name
                        }, void 0, false, {
                            fileName: "[project]/app/landing/speakers.tsx",
                            lineNumber: 1597,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-md text-gray-700 mb-1",
                            children: speaker.position
                        }, void 0, false, {
                            fileName: "[project]/app/landing/speakers.tsx",
                            lineNumber: 1598,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600 mb-4",
                            children: speaker.shortDescription
                        }, void 0, false, {
                            fileName: "[project]/app/landing/speakers.tsx",
                            lineNumber: 1599,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-gray-700 text-center max-h-60 overflow-y-auto pr-2 custom-scrollbar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: speaker.biography
                            }, void 0, false, {
                                fileName: "[project]/app/landing/speakers.tsx",
                                lineNumber: 1603,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/landing/speakers.tsx",
                            lineNumber: 1602,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "mt-6 px-6 py-2 bg-gradient-to-r from-[#23AF57] via-[#EC2227] to-[#00A9DE] text-white rounded-md transition-all hover:shadow-lg",
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/app/landing/speakers.tsx",
                            lineNumber: 1607,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/landing/speakers.tsx",
                    lineNumber: 1532,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/landing/speakers.tsx",
            lineNumber: 1512,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/landing/speakers.tsx",
        lineNumber: 1505,
        columnNumber: 5
    }, this);
}
_s1(SpeakerModal, "iXNJws+mDn9J+ZcpHudMXHGV85c=");
_c2 = SpeakerModal;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SpeakersPage");
__turbopack_context__.k.register(_c1, "SpeakerCard");
__turbopack_context__.k.register(_c2, "SpeakerModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_4883b99f._.js.map