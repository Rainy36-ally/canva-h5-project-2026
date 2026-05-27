from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.goto('http://127.0.0.1:8899/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(500)

    # === Initial state ===
    print("=== Page 1 (initial, should be active) ===")
    s = page.evaluate("""() => {
        const el = document.getElementById('page-1');
        const cs = getComputedStyle(el);
        return {
            className: el.className,
            position: cs.position, top: cs.top, transform: cs.transform,
            opacity: cs.opacity, zIndex: cs.zIndex, pointerEvents: cs.pointerEvents,
            height: cs.height, width: cs.width, display: cs.display,
            flexDirection: cs.flexDirection, justifyContent: cs.justifyContent,
            overflowY: cs.overflowY, boxSizing: cs.boxSizing,
            marginTop: cs.marginTop, paddingTop: cs.paddingTop
        };
    }""")
    for k, v in s.items():
        print(f"  {k}: {v}")

    print("\n=== Page 2 (initial, should be inactive) ===")
    s = page.evaluate("""() => {
        const el = document.getElementById('page-2');
        const cs = getComputedStyle(el);
        return {
            className: el.className,
            position: cs.position, top: cs.top, bottom: cs.bottom, transform: cs.transform,
            opacity: cs.opacity, zIndex: cs.zIndex, pointerEvents: cs.pointerEvents,
            height: cs.height, width: cs.width, display: cs.display, visibility: cs.visibility,
            flexDirection: cs.flexDirection, justifyContent: cs.justifyContent,
            overflowY: cs.overflowY, boxSizing: cs.boxSizing,
            marginTop: cs.marginTop, paddingTop: cs.paddingTop
        };
    }""")
    for k, v in s.items():
        print(f"  {k}: {v}")

    rect2 = page.evaluate("() => { const el = document.getElementById('page-2'); return el.getBoundingClientRect(); }")
    print(f"  rect: top={rect2['top']:.1f} bottom={rect2['bottom']:.1f} w={rect2['width']:.1f} h={rect2['height']:.1f}")

    # Page 2's .page-newspaper
    print("\n=== Page 2 .page-newspaper (initial) ===")
    s = page.evaluate("""() => {
        const el = document.querySelector('#page-2 .page-newspaper');
        if (!el) return null;
        const cs = getComputedStyle(el);
        return {
            position: cs.position, top: cs.top, height: cs.height,
            overflowY: cs.overflowY, alignSelf: cs.alignSelf,
            marginTop: cs.marginTop, paddingTop: cs.paddingTop
        };
    }""")
    if s:
        for k, v in s.items():
            print(f"  {k}: {v}")
    else:
        print("  NOT FOUND")

    # Now goTo(2)
    print("\n=== Calling goTo(2) ===")
    page.evaluate("goTo(2)")
    page.wait_for_timeout(1000)

    print("\n=== Page 1 after goTo(2) ===")
    s = page.evaluate("""() => {
        const el = document.getElementById('page-1');
        return { className: el.className, transform: getComputedStyle(el).transform, opacity: getComputedStyle(el).opacity };
    }""")
    for k, v in s.items():
        print(f"  {k}: {v}")

    print("\n=== Page 2 after goTo(2) ===")
    s = page.evaluate("""() => {
        const el = document.getElementById('page-2');
        const cs = getComputedStyle(el);
        return {
            className: el.className,
            position: cs.position, top: cs.top, transform: cs.transform,
            opacity: cs.opacity, zIndex: cs.zIndex, pointerEvents: cs.pointerEvents,
            height: cs.height, width: cs.width, overflowY: cs.overflowY,
            flexDirection: cs.flexDirection, justifyContent: cs.justifyContent
        };
    }""")
    for k, v in s.items():
        print(f"  {k}: {v}")

    rect2a = page.evaluate("() => { const el = document.getElementById('page-2'); return el.getBoundingClientRect(); }")
    print(f"  rect: top={rect2a['top']:.1f} bottom={rect2a['bottom']:.1f} h={rect2a['height']:.1f}")

    # App/html/body overflow
    app_ov = page.evaluate('() => getComputedStyle(document.querySelector("#app")).overflow')
    html_ov = page.evaluate('() => getComputedStyle(document.documentElement).overflow')
    body_ov = page.evaluate('() => getComputedStyle(document.body).overflow')
    print(f"\n  #app overflow: {app_ov}")
    print(f"  html overflow: {html_ov}")
    print(f"  body overflow: {body_ov}")

    # Check #app styles
    app_s = page.evaluate("""() => {
        const el = document.querySelector('#app');
        const cs = getComputedStyle(el);
        return { overflow: cs.overflow, overflowX: cs.overflowX, overflowY: cs.overflowY, position: cs.position, height: cs.height };
    }""")
    print(f"  #app: {app_s}")

    page.screenshot(path='/tmp/diag_page2c.png')
    print("\nSaved screenshot.")
    browser.close()
