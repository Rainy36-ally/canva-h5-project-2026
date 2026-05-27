from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.goto('http://127.0.0.1:8899/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(500)

    print("=== Page 1 (initial) ===")
    r = page.evaluate("""() => {
        const el = document.getElementById('page-1');
        return { pos: getComputedStyle(el).position, rect: el.getBoundingClientRect() };
    }""")
    print(f"  position={r['pos']}, rect.top={r['rect']['top']:.1f}")

    print("\n=== Page 2 (initial) ===")
    r = page.evaluate("""() => {
        const el = document.getElementById('page-2');
        return { pos: getComputedStyle(el).position, rect: el.getBoundingClientRect() };
    }""")
    print(f"  position={r['pos']}, rect.top={r['rect']['top']:.1f}")

    page.evaluate("goTo(2)")
    page.wait_for_timeout(800)

    print("\n=== Page 2 after goTo(2) ===")
    r = page.evaluate("""() => {
        const el = document.getElementById('page-2');
        return { pos: getComputedStyle(el).position, rect: el.getBoundingClientRect() };
    }""")
    print(f"  position={r['pos']}, rect.top={r['rect']['top']:.1f}")

    # Check .page-newspaper is found
    pn = page.evaluate("() => !!document.querySelector('#page-2 .page-newspaper')")
    print(f"  .page-newspaper found: {pn}")

    if pn:
        rn = page.evaluate("""() => {
            const el = document.querySelector('#page-2 .page-newspaper');
            return { pos: getComputedStyle(el).position, rect: el.getBoundingClientRect() };
        }""")
        print(f"  .page-newspaper: position={rn['pos']}, rect.top={rn['rect']['top']:.1f}")

    page.screenshot(path='/tmp/verify_fix.png', full_page=False)
    print("\nScreenshot saved.")
    browser.close()
