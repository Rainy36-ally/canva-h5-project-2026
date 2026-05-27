from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.goto('http://127.0.0.1:8899/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(500)

    # === Check ALL style sheets and find what sets position on .page ===
    print("=== All CSS sheets/rules ===")
    result = page.evaluate("""() => {
        const out = [];
        for (const sheet of document.styleSheets) {
            try {
                for (const rule of sheet.cssRules) {
                    if (rule.selectorText && rule.selectorText.includes('.page')) {
                        out.push({
                            href: sheet.href || 'inline',
                            cssText: rule.cssText
                        });
                    }
                }
            } catch(e) {
                out.push({error: e.message});
            }
        }
        return out;
    }""")
    for r in result:
        if 'error' in r:
            print(f"  ERROR: {r['error']}")
        else:
            print(f"  [{r['href']}] {r['cssText'][:200]}")

    # Check inline styles on page-1 and page-2
    print("\n=== Inline styles on #page-1 ===")
    s = page.evaluate("""() => {
        const el = document.getElementById('page-1');
        return { style: el.getAttribute('style') || 'none', classList: el.className };
    }""")
    print(f"  style: {s['style']}")
    print(f"  classes: {s['classList']}")

    print("\n=== Inline styles on #page-2 ===")
    s = page.evaluate("""() => {
        const el = document.getElementById('page-2');
        return { style: el.getAttribute('style') || 'none', classList: el.className };
    }""")
    print(f"  style: {s['style']}")
    print(f"  classes: {s['classList']}")

    # Check computed style source by looking at computed style of each individual prop
    print("\n=== Detailed .page CSS analysis ===")
    cs = page.evaluate("""() => {
        const el = document.getElementById('page-2');
        const cs = getComputedStyle(el);
        return {
            position: cs.position,
            positionSource: cs.cssText ? 'has cssText' : 'no cssText'
        };
    }""")
    print(f"  {cs}")

    # Look for any style attribute that might set position
    print("\n=== All page div styles ===")
    all_pages = page.evaluate("""() => {
        return [...document.querySelectorAll('.page')].map(el => ({
            id: el.id,
            classes: el.className,
            styleAttr: el.getAttribute('style') || '',
            inlinePosition: el.style.position
        }));
    }""")
    for p in all_pages:
        print(f"  {p}")

    # Test: directly set position absolute via JS
    print("\n=== Test: force position absolute on page-2 ===")
    page.evaluate("""() => {
        const el = document.getElementById('page-2');
        el.style.position = 'absolute';
    }""")
    s = page.evaluate("""() => {
        const el = document.getElementById('page-2');
        return { position: getComputedStyle(el).position, rect: el.getBoundingClientRect() };
    }""")
    print(f"  position: {s['position']}")
    print(f"  rect: top={s['rect']['top']:.1f}")

    browser.close()
