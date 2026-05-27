/* ===== Canva 大广赛 H5 v3 — 纯文字解密·沉浸证词版 ===== */

const TOTAL_PAGES = 14;

// ══════════════════════════════════════
// 证词内容数据库（错误答案触发，动态插入）
// ══════════════════════════════════════
const CLUE_CONTENTS = {

  // ── 谜题1 ──
  'clue-1a': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报档案 · 旧学徒名册（民国廿三年）</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9">
        本报记者从旧档案中找到了一份《创作快报》前两年的学徒考核记录——<br><br>
        学徒乙，入行：1934年3月。考核通过：<b>三个月零七天</b>。评语："用功，手稳。"<br><br>
        学徒丙，入行：1934年7月。考核通过：<b>四个月</b>。评语："构图尚可，刻字偏慢。"<br><br>
        学徒甲，入行：1933年11月。考核结果：<b>至今未通过</b>。评语："手太慢，不适合这行。"<br><br>
        ─────────<br><br>
        <b style="color:var(--paper-accent)">如果墨先生只是"手艺好"——那他应该也练了三年。</b><br>
        <b style="color:var(--paper-accent)">但小笔说的是：他五秒钟就搞定。</b><br><br>
        差距不在手艺。那在哪里？
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue()" style="margin-top:1rem;max-width:360px">重新思考 →</button>`,

  'clue-1b': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报档案 · 小笔访谈记录（续）</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9">
        记者追问小笔："墨先生有没有别人帮他？"<br><br>
        小笔的回答：<br>
        "他从来不让任何人碰他的桌子。早上来，关门，到中午才出来。<b>整个过程就他一个人。</b>你们说的什么'团队'、'工作室'——一个都没有。"<br><br>
        ─────────<br><br>
        至于第4页那封密信提到的"寄包裹"——小笔听完后笑了一声：<br>
        "什么包裹？我天天在报社，<b>从来没见他收过任何东西。</b>"<br><br>
        <b style="color:var(--paper-accent)">密信说"有包裹"，小笔说"从来没有"。</b><br>
        一个说有人帮忙，一个说只有他一个人。<br><br>
        那么——谁更接近真相？或者，两者都不完全准确？
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue()" style="margin-top:1rem;max-width:360px">重新思考 →</button>`,

  // ── 第4页 密信干扰 ──
  'clue-4a': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报档案 · 第二封匿名信</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9;font-style:italic">
        "你们被第一封信骗了。<br><br>
        墨先生从来不给任何人看过那块玻璃板的操作过程。那个'寄包裹'的说法——是有人故意放出来的。<br><br>
        真正的情况是：<b>有人不想让你们查那块玻璃板。</b>"<br><br>
        <span style="font-size:0.78rem;color:#6b5a4a;font-style:normal">—— 另一封匿名信，字迹完全不同</span>
      </div>
      <div style="margin-top:0.8rem;padding:0.7rem 1rem;background:rgba(139,37,0,0.06);border-radius:8px;font-size:0.82rem;color:var(--paper-ink);line-height:1.7">
        <b>两封密信，内容完全相反。</b><br>
        一封说"有包裹，背后有人"。<br>
        另一封说"'有包裹'是有人故意放出来的"。<br><br>
        两封信都不可全信。<br>
        但如果你两封信都读过了——你就知道，<b>有人不想让你查玻璃板。</b><br>
        这说明玻璃板才是关键。<br>
        你走的方向偏离了核心。
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue();goTo(3)" style="margin-top:1rem;max-width:360px">回到第3页 重新梳理线索 →</button>`,

  'clue-4b': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报追踪 · 夜间监控记录</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9">
        虽然密信可信度不高，但本报记者从另一条渠道拿到了夜间记录——<br><br>
        过去十天，墨先生有七次在<b>深夜十一点至凌晨一点</b>之间离开报社。<br>
        出门时带一个<b>黑色手提包</b>，回来时空手。<br><br>
        他去做什么？没有人知道。<br><br>
        小笔说："我晚上不在报社，不知道他去哪儿了。"<br>
        报摊老陈说："他下班从来不带东西走，只拿外套。"<br><br>
        <b style="color:var(--paper-accent)">七次深夜出门，带包出去，空手回来。</b><br>
        如果密信说的"寄包裹"不成立——那这个包里装的，是什么？
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue();goTo(3)" style="margin-top:1rem;max-width:360px">回到第3页 重新梳理线索 →</button>`,

  // ── 谜题2速通 ──
  'clue-2a': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报现场记录 · 玻璃板照片技术还原</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9">
        本报技术版编辑仔细分析了那张玻璃板的照片——<br><br>
        屏幕上显示的文字<b>不是排好的版面</b>，而是正在被"编辑"的状态：某些词颜色在变，某些字号在调整，一张图片的位置在移动。<br><br>
        而这一切发生的时候，墨先生的<b>手指没有碰键盘</b>。<br>
        他只是在说话。<br><br>
        ─────────<br><br>
        老陈的证词："他坐在桌子后面，<b>像在跟人说话</b>……颜色变了，文字改了。"<br><br>
        <b style="color:var(--paper-accent)">如果只是打字——那他得边打边等结果，不可能"颜色跟着变"。</b><br>
        <b style="color:var(--paper-accent)">打字机和预设版式机，都做不到"跟它说话"这件事。</b>
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue()" style="margin-top:1rem;max-width:360px">重新思考 →</button>`,

  'clue-2b': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报分析 · 那段乱序文字还原</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9">
        如果把那段乱序文字拼通顺——<br><br>
        <span style="font-family:Georgia,serif;font-size:0.95rem;line-height:2;display:block;letter-spacing:0.1em;background:rgba(28,18,8,0.05);padding:0.7rem;border-radius:8px;margin:0.3rem 0">
          "AI，帮我做一张音乐节海报。把颜色改得更活泼。"
        </span><br>
        这是<b>两件事</b>：<br><br>
        第一件："帮我做一张海报"——这是<b>从零开始生成</b>一个东西，不是从已有的版式里选。<br>
        第二件："把颜色改得更活泼"——这是<b>对已经生成的东西进行修改</b>，不是换一个版式。<br><br>
        ─────────<br><br>
        版式机能帮你选好框架，但做不到这两件事。<br>
        能"生成"一张海报、又能"改颜色"的东西——<b>不是版式机。</b>
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue()" style="margin-top:1rem;max-width:360px">重新思考 →</button>`,

  // ── 谜题2深扒 ──
  'clue-3a': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报特别报道 · "幕后设计师"追踪</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9">
        本报记者顺着"背后有人接单"这个方向深挖，查到了几个无法解释的细节——<br><br>
        <b>第一：</b>墨先生的玻璃板<b>不需要联网</b>。它在地下车库也能用，在封闭的房间里也能用。没有网线，没有接线，什么都没有。<br><br>
        <b>第二：</b>如果背后真的有设计师在接单，这个人必须<b>24小时待命</b>——因为墨先生随时可能跟那块板对话。但这个"设计师"在这半个月里，没有出现在任何地方，没有人见过他。<br><br>
        <b>第三：</b>西洋期刊原文写的是——<i>"<b>machine</b> generates the image"</i>（机器生成图像）。不是"后台有人接单"，是<b>机器</b>。<br><br>
        ─────────<br><br>
        <b style="color:var(--paper-accent)">三个细节，全部指向同一个方向——</b><br>
        <b style="color:var(--paper-accent)">那块玻璃板里，是一个机器，不是一个人。</b>
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue()" style="margin-top:1rem;max-width:360px">重新思考 →</button>`,

  'clue-3b': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报档案 · 墨先生便条（背面）</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9">
        本报记者从墨先生桌上发现的那张便条——正面写的是"工具替你做"，<b>背面还有一行小字</b>——<br><br>
        <span style="font-family:Georgia,serif;font-style:italic;font-size:0.95rem;background:rgba(28,18,8,0.05);padding:0.6rem 1rem;border-radius:6px;display:inline-block;margin:0.3rem 0">
          "试用了一个月，今天开始正式用。效率翻了十倍。"<br>—— 1935.04.12
        </span><br><br>
        ─────────<br><br>
        注意这个日期：<b>1935年4月12日</b>。<br><br>
        如果墨先生是某个西洋公司的代理商——那他应该<b>早就知道</b>这个工具。<br>
        但他写的是"<b>试用了一个月</b>"——说明他<b>也是第一次用</b>。<br><br>
        西洋期刊报道的这套技术，正式公开发表是在<b>1935年5月</b>——比这张便条的日期晚了整整两周。<br><br>
        <b style="color:var(--paper-accent)">墨先生用这块玻璃板的时候，西洋还在讨论这个技术"能不能实现"。</b><br>
        <b style="color:var(--paper-accent)">他比全世界都先用了两个星期。</b><br><br>
        代理商？一个"试用了一个月"的代理商？
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue()" style="margin-top:1rem;max-width:360px">重新思考 →</button>`,

  // ── 第7页 技术分析干扰 ──
  'clue-5a': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报现场记录 · 报摊老陈的补充证词</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9">
        老陈的证词说得更具体——<br><br>
        "他坐在桌子后面，<b>对着那块板说话</b>。<br>
        '把颜色调红一点'——颜色变了。<br>
        '这个标题不够大'——字变大了。<br>
        '换个活泼点的风格'——整个版面换了。<br>
        他不是在跟人说话，<b>他是在跟那块板说话</b>。"<br><br>
        ─────────<br><br>
        技术编辑说"玻璃板里住了个设计师"——但老陈说的是"颜色变了，字变大了"。<br><br>
        如果真的有个人在玻璃板后面——那这个人得<b>听一句就改一句</b>，24小时不睡觉，永远在线。<br><br>
        更合理的解释是：<b>这块玻璃板是一个能理解人话的机器——不是"人住在板子里"，是"板子里有个能理解话的脑子"。</b>
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue()" style="margin-top:1rem;max-width:360px">重新思考 →</button>`,

  'clue-5b': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报档案 · 技术版编辑的完整笔记（节选）</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9">
        本报记者从技术编辑的废纸篓里找到了一页写满字的草稿——<br><br>
        <span style="font-family:Georgia,serif;font-style:italic;background:rgba(28,18,8,0.05);padding:0.7rem 1rem;border-radius:6px;display:block;font-size:0.85rem">
          "第四步：说话→版面改变。<br>
          这一步不是模板能做到的。模板帮你选框架，但不能理解'更活泼'这种描述。<br>
          所以第四步必须有别的东西介入——<br>
          要么是一个人——但人不可能24小时在线。<br>
          要么是一个机器——但机器怎么理解人话？<br>
          ─────────<br>
          结论：只能假设存在一个能理解人话的智能体。是人是机器，目前无法确定。<br>
          但最合理的推测是——机器。"<br>
          <span style="font-style:normal;font-size:0.78rem;color:#6b5a4a">—— 技术编辑手稿，未刊出</span>
        </span><br><br>
        ─────────<br><br>
        <b style="color:var(--paper-accent)">注意：技术编辑在公开文章里说"玻璃板里住了个设计师"——但他的私人笔记里，自己写的是"最合理的推测是机器"。</b><br><br>
        他公开发表的版本，故意用了一个更"玄"的说法。<br>
        为什么？
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue()" style="margin-top:1rem;max-width:360px">重新思考 →</button>`,

  // ── 谜题3 ──
  'clue-6a': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报档案 · 墨先生的话（多来源交叉印证）</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9">
        本报记者收集了多段与墨先生相关的对话记录，寻找他原话的准确版本——<br><br>
        <b>小笔的回忆：</b><br>
        "他拿起那本手册，翻到某一页，然后说——<b>'模板海量，免费，还有字体库'</b>。就这八个字，没别的了。"<br><br>
        <b>报摊老陈补充：</b><br>
        "我当时也在旁边。他确实是这么说的——<b>'模板海量'</b>。这四个字我记得特别清楚，因为'海量'这词我以前只在洋人报纸上见过。"<br><br>
        ─────────<br><br>
        <b style="color:var(--paper-accent)">两个人，两个独立的来源，说法完全一致。</b><br>
        <b style="color:var(--paper-accent)">"模板"在最前面。</b><br><br>
        你的答案里把"字体库"放在了最前面。<br>
        但墨先生本人的原话，和手册上的排列——都是"模板"第一。<br><br>
        哪个词应该跟在"模板"后面？
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue()" style="margin-top:1rem;max-width:360px">重新思考 →</button>`,

  'clue-6b': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报档案 · 那本手册扉页的完整照片</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9">
        本报记者从墨先生桌上拍到了那本手册扉页的<b>完整照片</b>——<br><br>
        四个词清晰地写在上面，每个词之间有间距，顺序如下：<br><br>
        <span style="font-family:Georgia,serif;font-size:1.1rem;line-height:2.2;display:block;letter-spacing:0.18em;text-align:center">
          模　板 · 海　量 · 免　费 · 字　体　库
        </span><br>
        ─────────<br><br>
        你的答案里——"免费"放在了"模板"前面。<br>
        但手册上，"免费"排在了<b>第三位</b>。<br><br>
        墨先生后来跟人聊起这座"素材仓库"时，用的也是这个顺序：<br>
        "<b>模板海量</b>，<b>免费</b>，<b>还有字体库</b>"<br><br>
        <b style="color:var(--paper-accent)">第一个词是"模板"，第二个词是什么？</b>
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue()" style="margin-top:1rem;max-width:360px">重新思考 →</button>`,

  // ── 第9页 读者来信干扰 ──
  'clue-9a': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报追踪 · 《申报》同日快讯</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9">
        《申报》今天恰好刊登了一条消息——<br><br>
        <span style="font-family:Georgia,serif;font-style:italic;background:rgba(28,18,8,0.05);padding:0.7rem 1rem;border-radius:6px;display:block;font-size:0.88rem">
          "西洋科技公司 Canva 宣布：将向全球免费开放其设计模板库，永久免费。<br>
          该公司表示，模板库内目前已有超过六万套设计模板，涵盖社交媒体、印刷品、视频等多种格式，全部免费使用，无需付费订阅。"<br>
          <span style="font-style:normal;font-size:0.78rem;color:#6b5a4a">—— 《申报》· 1935年5月21日</span>
        </span><br><br>
        ─────────<br><br>
        发布日：<b>1935年5月21日</b>。<br>
        本报开始追踪墨先生的日子：<b>同一天</b>。<br><br>
        <b style="color:var(--paper-accent)">这不能是巧合。</b><br>
        <b style="color:var(--paper-accent)">墨先生手里的那块玻璃板，和这份"永久免费"的模板库——来自同一个地方。</b>
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue();goTo(8)" style="margin-top:1rem;max-width:360px">回到第8页 重新深扒 →</button>`,

  'clue-9b': `
    <div style="border-top:1px solid rgba(44,24,16,0.2);margin:1.2rem 0 0"></div>
    <div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.18);border-radius:12px;padding:1.2rem 1.4rem;margin-top:1rem;max-width:560px;width:100%">
      <div style="font-size:0.7rem;font-weight:800;letter-spacing:0.14em;color:var(--paper-accent);margin-bottom:0.6rem">📋 本报追踪 · 小笔的最新爆料</div>
      <div style="font-size:0.82rem;color:var(--paper-ink);line-height:1.9">
        听说"老设计"那封信之后，小笔主动找到了本报记者——<br><br>
        "你们别信那个'老设计'的。他说得对，以前做设计确实费钱费时间。<br>
        但墨先生跟我说过一句话——<br><br>
        '<b>以前你们要花钱买模板、找素材、租服务器，现在这些东西放在一个地方，免费给你用。</b><br>
        不是商业模式变了——<b>是工具变了。</b>'<br><br>
        他说以前的那些老经验，在这块玻璃板面前——<b>全不适用了。</b>"<br><br>
        ─────────<br><br>
        <b style="color:var(--paper-accent)">"老设计"用旧逻辑判断新事物，自然会得出"不可能"的结论。</b><br>
        <b style="color:var(--paper-accent)">但墨先生不是在做老一套——他用的是一块玻璃板、一个全新的平台。</b><br><br>
        旧逻辑走不通的时候，也许该换个角度——看看这个新平台到底有什么。
      </div>
    </div>
    <button class="newspaper-btn" onclick="closeClue();goTo(8)" style="margin-top:1rem;max-width:360px">回到第8页 重新深扒 →</button>`
};

// ─── 路由 ───
let currentPage = 1;
function goTo(n) {
  if (n < 1 || n > TOTAL_PAGES) return;
  const oldEl = document.querySelector('.page.active');
  const newEl = document.getElementById('page-' + n);
  if (!newEl) return;

  // 切换前销毁任何已有的证词层
  const existingClue = document.getElementById('active-clue-layer');
  if (existingClue) existingClue.remove();

  if (oldEl) { oldEl.classList.add('exit-up'); oldEl.classList.remove('active'); setTimeout(() => oldEl.classList.remove('exit-up'), 500); }
  currentPage = n;
  newEl.classList.add('active');
  updateProgress();
  window.scrollTo(0, 0);

  if (n === 14) confetti();

  setTimeout(() => {
    const matches = newEl.querySelectorAll('.page-body, .options, .feature-badge, .newspaper-masthead, .newspaper-headline, .newspaper-body, .newspaper-subhead, .truth-grid, .interference-box');
    if (matches.length) {
      matches.forEach(el => staggerReveal(el));
    } else {
      staggerReveal(newEl);
    }
    // 证词层如果存在，强制显示并确保不在 staggerReveal 范围内
    const clueAfter = document.getElementById('active-clue-layer');
    if (clueAfter) {
      console.log('[goTo] clue layer survived transition, forcing .active');
      clueAfter.classList.add('active');
    }
  }, 80);
}
function updateProgress() {
  const pct = Math.round(currentPage / TOTAL_PAGES * 100);
  const bar = document.getElementById('progress-fill');
  if (bar) bar.style.width = pct + '%';
  const ind = document.getElementById('page-indicator');
  if (ind) ind.textContent = currentPage + ' / ' + TOTAL_PAGES;
}

// ─── 内容渐入 ───
function staggerReveal(container) {
  const children = container.children;
  for (let i = 0; i < children.length; i++) {
    // 跳过证词层，由 CSS .clue-reveal.active 控制显示
    if (children[i].classList.contains('clue-reveal')) continue;
    children[i].style.opacity = '0';
    children[i].style.transform = 'translateY(16px)';
    children[i].style.transition = `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`;
    setTimeout(() => {
      children[i].style.opacity = '1';
      children[i].style.transform = 'translateY(0)';
    }, 30);
  }
}

// ─── 撒花 ───
function confetti() {
  const colors = ['#00C4CC', '#FFD700', '#FF6B9D', '#6C63FF', '#00E676'];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:-10px;z-index:9998;pointer-events:none;font-size:${4+Math.random()*6}px;animation:confettiDrop ${1.5+Math.random()*1.5}s ease forwards;animation-delay:${Math.random()*0.5}s;color:${colors[i%colors.length]}`;
    el.textContent = ['✦','✧','★','♦','●','■'][Math.floor(Math.random()*6)];
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

// ─── 证词层动态展开 ───
let _activeClueId = null;

function openClue(id) {
  // 先清除已有证词
  const existing = document.getElementById('active-clue-layer');
  if (existing) existing.remove();

  const html = CLUE_CONTENTS[id];
  if (!html) { console.warn('Missing clue:', id); return; }

  const el = document.createElement('div');
  el.id = 'active-clue-layer';
  el.className = 'clue-reveal active';
  el.innerHTML = html;
  // 插入到当前页面的 options 后面（作为 .page 的直接子元素，不进入任何 staggerReveal 容器）
  const options = document.querySelector('.page.active .options');
  if (options) {
    options.parentNode.insertBefore(el, options.nextSibling);
  } else {
    document.querySelector('.page.active').appendChild(el);
  }
  _activeClueId = id;
  console.log('[openClue] inserted #active-clue-layer, classes:', el.className, 'children:', el.children.length);
  // 证词层在 flex 容器内，滚动父容器使其可见
  setTimeout(() => {
    const pageEl = document.querySelector('.page.active');
    if (pageEl) pageEl.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }, 100);
}

function closeClue() {
  const el = document.getElementById('active-clue-layer');
  if (el) {
    el.classList.remove('active');
    setTimeout(() => { if (el.parentNode) el.remove(); _activeClueId = null; }, 500);
  }
  _activeClueId = null;
}

// ══════════════════════════════════════
// 页面配置
// ══════════════════════════════════════
const PAGES = {

  // ────────────────────────────────────────────────────
  // 第1页：墨先生登场
  // ────────────────────────────────────────────────────
  1: {
    bg: 'newspaper',
    render() { return `<div class="newspaper-masthead"><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0.3rem"><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">民国二十五年 · 上海</span><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">创 作 内 幕 日 报</span></div><div class="paper-name">创 作 内 幕 日 报</div><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-top:0.3rem"><span style="font-size:0.65rem;color:#6b5a4a">社媒特刊 · 第001期</span><span style="font-size:0.65rem;color:#6b5a4a">www.insider.daily</span></div></div><div style="text-align:center;margin:0.5rem 0"><span style="display:inline-block;background:var(--paper-accent);color:var(--paper);font-size:0.65rem;font-weight:800;letter-spacing:0.15em;padding:0.2rem 1.2rem;border-radius:2px">独 家 头 条 · 全 网 首 发</span></div><div class="newspaper-headline" style="text-decoration:underline;text-decoration-style:wavy;text-underline-offset:4px">上海滩惊现"墨先生"<br>十分钟出报 效率高得离奇</div><div class="newspaper-subhead">本报记者连日追踪 揭开"凭空印报"背后的真相</div><div class="newspaper-divider"></div><div style="display:flex;gap:1rem;width:100%;max-width:600px;margin:0 auto 1rem"><div class="newspaper-body" style="flex:1;margin:0;font-size:0.82rem"><b>【本报讯】</b> 上海法租界一家名不见经传的小报《创作快报》，近半个月来引起全城关注。<br><br>原因无他——主笔兼编辑<b>"墨先生"</b>，从来不出门采访，不见任何投稿，每天早上仅花十余分钟，就能"变"出一整份排版精美、图文并茂的报纸。<br><br>效率高到离谱，反而惹来满城猜疑。<br><br><b>有人说</b>，他是从西洋留学归来的排版工程师，带了新式机器回来。<br><b>有人说</b>，他根本不是什么墨先生，而是"某几个人"合用的笔名，轮流出来应付访客。<br><b>还有人说</b>，他口袋里漏出一块<b>发光的玻璃板</b>，往上面指一下——文字图片自己就排好了，根本不需要人手。</div><div style="flex:0 0 100px;border-left:1px solid var(--paper-ink);padding-left:1rem"><div style="font-size:0.6rem;font-weight:800;letter-spacing:0.1em;color:var(--paper-accent);margin-bottom:0.3rem">热 点 速 览</div><div style="font-size:0.6rem;color:#6b5a4a;line-height:1.8">⏱️ 出报仅需10分钟<br>📰 一天一刊从不缺<br>✍️ 从不外出采访<br>🔍 三种说法 真相未明</div></div></div><div class="newspaper-body" style="text-align:left;margin:0 auto 1rem;max-width:520px">本报记者<b>卧底数日</b>，从一张工作照入手，<b style="color:var(--paper-accent)">逐条破解四大谜题</b>，还原墨先生之谜。<br>翻到第2页，随本报一同追踪——</div><div style="display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin:1rem auto 0;padding-top:0.5rem;border-top:1px solid rgba(44,24,16,0.15)"><span style="font-size:0.6rem;color:#6b5a4a">编辑：圈内观察员 · 校对：减负密码组</span><span style="font-size:0.6rem;color:#6b5a4a">第 1 页 / 共 14 页</span></div><button class="newspaper-btn" onclick="goTo(2)">翻到第2页 · 继续追踪</button>`; }
  },

  // ────────────────────────────────────────────────────
  // 第2页：两条路线
  // ────────────────────────────────────────────────────
  2: {
    bg: 'newspaper',
    render() { return `<div class="newspaper-masthead"><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0.3rem"><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">民国二十五年 · 上海</span><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">创 作 内 幕 日 报</span></div><div class="paper-name">创 作 内 幕 日 报</div></div><div class="newspaper-subhead">上接第1版</div><div class="newspaper-body">记者从不同渠道拿到了<b>两条独立线索</b>——<br>每条线索指向墨先生谜团的一个侧面，<b>两条路的真相不一样</b>。<br><br>本报编辑提示：<br><b style="color:var(--paper-accent)">"想最快搞懂减负密码的，走快查路线。"</b><br><b style="color:var(--paper-accent)">"想彻底还原真相的，走深查路线。"</b><br><br>请选择你的调查路线：</div><div class="options" style="gap:1rem"><button class="option-card" onclick="goTo(3)" style="background:rgba(139,37,0,0.06);border-color:rgba(139,37,0,0.2)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">🚀</span><span class="option-text"><b>快查路线</b> — 先抓核心破绽，走最短路径</span><span class="option-arrow">→</span></button><button class="option-card" onclick="goTo(6)" style="background:rgba(139,37,0,0.06);border-color:rgba(139,37,0,0.2)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">🔬</span><span class="option-text"><b>深查路线</b> — 逐一深挖细节，还原完整真相</span><span class="option-arrow">→</span></button></div>`; }
  },

  // ────────────────────────────────────────────────────
  // 第3页：谜题1 — 小白必备·新手友好
  // ────────────────────────────────────────────────────
  3: {
    bg: 'newspaper',
    render() { return `<div class="newspaper-masthead"><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0.3rem"><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">民国二十五年 · 上海</span><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">创 作 内 幕 日 报</span></div><div class="paper-name">创 作 内 幕 日 报</div></div><div class="newspaper-subhead" style="margin-top:0.3rem;border-color:var(--paper-ink)">第3版</div><div class="newspaper-body" style="text-align:left"><b style="color:var(--paper-accent)">旁观者说</b><br><br><span style="font-size:0.88rem;color:#6b5a4a;display:block;margin-bottom:0.5rem;font-style:italic">——多家报社编辑的私下议论——</span><br>"墨先生那版面，铅字排得密而不乱，图片位置恰到好处。换了是我，至少得花大半天。他一个人，十分钟？"<br><br>"你们不懂，人家是练出来的。手艺这玩意儿，没有捷径。"<br><br>"手艺？我亲眼见他连排版尺都没拿过。就是在那块玻璃板上点几下，完了。"</div><div class="newspaper-divider"></div><div class="newspaper-body" style="text-align:left"><b style="color:var(--paper-accent)">小笔悄悄说</b><br><br>墨先生身边有个小助手，叫小笔。他实在看不下去了，悄悄向本报透露了一些内情。<br><br>"我们以前招学徒，最少也要练<b>三个月</b>才能上手刻铅字。墨先生来了之后——<br><br>他没有让我们招新学徒，也没有花钱找排版师傅。<br>他就坐在那张桌子后面，手里那块玻璃板点几下——<b>版面自己就出来了。</b><br>那些我们以前要刻三小时的版面，他<b>五秒钟</b>搞定。<br><br>他常说一句话：<b>'做图排版，根本不需要会什么手艺。'</b>"</div><div class="newspaper-divider"></div><div class="newspaper-body" style="text-align:left;font-size:0.82rem"><b style="color:var(--paper-accent)">墨先生本人（只言片语）</b><br><br><span style="font-style:italic;color:#6b5a4a">本报记者趁他不备，在他办公桌上发现了一张便条——</span><br>"新人用模板，老人用快捷键。记住：<b>工具替你做，不是人替你做。</b>"<br><br><b style="color:var(--paper-accent)">综合以上三种说法——旁观者、小笔、墨先生本人——你认为墨先生的真正含义是什么？</b></div><div class="options" style="gap:0.8rem;margin-top:1rem"><button class="option-card" onclick="onPuzzle1WrongA()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">📜</span><span class="option-text">墨先生是个技艺高超的手艺人，只是练到了极致，所以快</span><span class="option-arrow">→</span></button><button class="option-card" onclick="onPuzzle1WrongB()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">🛠️</span><span class="option-text">墨先生背后有一个秘密团队，众人合力才能做到"十分钟出报"</span><span class="option-arrow">→</span></button><button class="option-card" onclick="onPuzzle1Right()" style="border-color:rgba(108,99,255,0.3)"><span class="option-icon" style="background:rgba(108,99,255,0.15)">✨</span><span class="option-text"><b>他靠的是一种新工具，把人的手艺转化成了工具的自动化操作——普通人也能上手</b></span><span class="option-arrow">→</span></button></div><div style="display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin:1rem auto 0;padding-top:0.5rem;border-top:1px solid rgba(44,24,16,0.15)"><span style="font-size:0.6rem;color:#6b5a4a">编辑：圈内观察员 · 校对：减负密码组</span><span style="font-size:0.6rem;color:#6b5a4a">第 3 页 / 共 14 页</span></div>`; }
  },

  // ────────────────────────────────────────────────────
  // 第4页：速通干扰 — 密信 + 证词选择
  // ────────────────────────────────────────────────────
  4: {
    bg: 'newspaper',
    render() { return `<div class="newspaper-masthead"><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0.3rem"><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">民国二十五年 · 上海</span><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">创 作 内 幕 日 报</span></div><div class="paper-name">创 作 内 幕 日 报</div></div><div class="newspaper-subhead" style="margin-top:0.3rem;border-color:var(--paper-ink)">第4版 · 速通路线</div><div style="background:rgba(28,18,8,0.04);border:2px dashed rgba(28,18,8,0.2);border-radius:12px;padding:1.2rem;margin:1rem auto;max-width:560px;width:100%"><div style="font-size:0.7rem;font-weight:800;letter-spacing:0.15em;color:var(--paper-accent);margin-bottom:0.6rem">⚡ 本报紧急收到一封匿名密信</div><div style="font-size:0.88rem;color:var(--paper-ink);line-height:1.9;font-style:italic">"你们别搞错了方向。墨先生哪里是一个人出报——<br>他每天晚上往报社寄包裹，里面是一叠叠已经排好版的纸。<br>你们以为那报纸是'凭空出现'的？<br>是有人连夜排好，在你们起床前塞到报摊去的。"<br><br><span style="font-size:0.78rem;color:#6b5a4a;font-style:normal">—— 一个不愿意透露姓名的人</span></div></div><div class="newspaper-body" style="text-align:left;margin-top:1rem;font-size:0.82rem"><b>编辑点评：</b><br>这封密信提供了一个完全不同的方向。如果属实，那"十分钟出报"就不需要什么高科技了。<br>但问题是——这封信本身，<b>就一定可信吗？</b><br><br><b>你倾向于怎么理解这封信？</b></div><div class="options" style="gap:0.8rem;margin-top:0.8rem"><button class="option-card" onclick="onInterfWrongA()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">📦</span><span class="option-text">密信说的有道理，墨先生背后确实有人在帮他排版</span><span class="option-arrow">→</span></button><button class="option-card" onclick="onInterfWrongB()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">🗑️</span><span class="option-text">密信可信度不高，不用管它，继续查玻璃板</span><span class="option-arrow">→</span></button><button class="option-card" onclick="onInterfRight()" style="border-color:rgba(108,99,255,0.3)"><span class="option-icon" style="background:rgba(108,99,255,0.15)">🔍</span><span class="option-text"><b>"寄包裹"这件事本身值得深究——密信可信度存疑，但有实物在流通</b></span><span class="option-arrow">→</span></button></div><div style="display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin:1rem auto 0;padding-top:0.5rem;border-top:1px solid rgba(44,24,16,0.15)"><span style="font-size:0.6rem;color:#6b5a4a">编辑：圈内观察员 · 校对：减负密码组</span><span style="font-size:0.6rem;color:#6b5a4a">第 4 页 / 共 14 页</span></div>`; }
  },

  // ────────────────────────────────────────────────────
  // 第5页：谜题2速通 — 对话式AI设计
  // ────────────────────────────────────────────────────
  5: {
    bg: 'newspaper',
    render() { return `<div class="newspaper-masthead"><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0.3rem"><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">民国二十五年 · 上海</span><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">创 作 内 幕 日 报</span></div><div class="paper-name">创 作 内 幕 日 报</div></div><div class="newspaper-subhead" style="margin-top:0.3rem;border-color:var(--paper-ink)">第5版 · 速通路线</div><div class="newspaper-body" style="text-align:left"><b style="color:var(--paper-accent)">线索二 · 目击者证词</b><br><br><span style="font-size:0.82rem;color:#6b5a4a;display:block;margin-bottom:0.6rem;font-style:italic">本报记者采访了报摊老板老陈——他每天帮墨先生送报。</span><br>"墨先生人很好，从不催我。但有件事我一直没搞懂——<br>他坐在桌子后面，对着那块玻璃板，<b>像在跟人说话</b>。<br>有时候他说'把颜色调红一点'，有时候说'这个标题不够大'。<br>然后那块板上的字和颜色就跟着变了。<br>他不是在打字——他是在<b>跟那块板对话</b>。"</div><div class="newspaper-divider"></div><div class="newspaper-body" style="text-align:left"><b style="color:var(--paper-accent)">玻璃板上的乱序文字</b><br><br><span style="font-size:0.82rem;color:#6b5a4a;font-style:italic">有人趁墨先生不在，偷偷拍了那块玻璃板的屏幕。照片上隐约显示着一行被打乱的字——</span><br><br><div style="background:rgba(28,18,8,0.06);border:1px solid rgba(28,18,8,0.15);border-radius:12px;padding:1rem 1.2rem;margin:0.8rem auto;max-width:500px;width:100%;text-align:center"><span style="font-size:1rem;font-weight:700;color:var(--paper-ink);line-height:2;display:block;letter-spacing:0.1em">帮我 · 做一张 · 音乐节 · 海报 · AI · 把颜色 · 改得 · 更活泼</span></div><br>这段乱序文字里，藏着墨先生跟那块玻璃板<b>最真实的互动方式</b>。<br><br><b style="color:var(--paper-accent)">请选择最能概括"墨先生与玻璃板的关系"的描述：</b></div><div class="options" style="gap:0.8rem;margin-top:0.5rem"><button class="option-card" onclick="onPuzzle2WrongA()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">⌨️</span><span class="option-text">他在玻璃板上打字排板，只是熟练到看起来像变魔术</span><span class="option-arrow">→</span></button><button class="option-card" onclick="onPuzzle2Right()" style="border-color:rgba(108,99,255,0.3)"><span class="option-icon" style="background:rgba(108,99,255,0.15)">💬</span><span class="option-text"><b>他跟这块玻璃板"对话"——说一句话，AI就帮他出图改图</b></span><span class="option-arrow">→</span></button><button class="option-card" onclick="onPuzzle2WrongB()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">📐</span><span class="option-text">玻璃板是一台预设好了所有版式的自动排版机</span><span class="option-arrow">→</span></button></div><div style="display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin:1rem auto 0;padding-top:0.5rem;border-top:1px solid rgba(44,24,16,0.15)"><span style="font-size:0.6rem;color:#6b5a4a">编辑：圈内观察员 · 校对：减负密码组</span><span style="font-size:0.6rem;color:#6b5a4a">第 5 页 / 共 14 页</span></div>`; }
  },

  // ────────────────────────────────────────────────────
  // 第6页：谜题2深扒 — 完整剪报
  // ────────────────────────────────────────────────────
  6: {
    bg: 'newspaper',
    render() { return `<div class="newspaper-masthead"><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0.3rem"><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">民国二十五年 · 上海</span><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">创 作 内 幕 日 报</span></div><div class="paper-name">创 作 内 幕 日 报</div></div><div class="newspaper-subhead" style="margin-top:0.3rem;border-color:var(--paper-ink)">第6版 · 细节路线</div><div style="background:rgba(28,18,8,0.03);border-left:3px solid rgba(28,18,8,0.2);padding:0.8rem 1.2rem;margin:0.8rem auto;max-width:560px;width:100%"><div style="font-size:0.7rem;font-weight:800;letter-spacing:0.12em;color:#6b5a4a;margin-bottom:0.3rem">副 刊 · 科 技 瞭 望</div><div style="font-size:0.72rem;color:#6b5a4a;font-style:italic">本报特约撰稿人 · 译自西洋期刊《The Designer's Review》</div></div><div class="newspaper-body" style="text-align:left;font-size:0.88rem"><b>人工智能，正在重新定义"设计师"</b><br><br>编者按：以下内容译自西洋最新科技期刊，不代表本报立场。<br><br>──────<br><br>近年西洋传来一种技术，名曰"人工智能设计"（Artificial Intelligence Design）。<br><br>其原理与人际交谈相通——<b>人以言语描述需求，机器以图像与文字即时回应。</b><br><br>有先行者试用后感叹：<br><i>"以前改一张海报要三小时，跟设计说明半天他还做偏了。现在我跟AI说'换个更活泼的颜色'，三秒后新的图已经出来了。"</i><br><br>又有人总结道：<br><i>"你不需要会画画、会排版，你只需要会说清楚你想要什么。"</i><br><br>另有业内人士指出，这套系统还内置了一个<b>素材仓库</b>，里面存放着<b>海量模板、字体和图片</b>，全部免费取用。<br><br>──────<br><br><span style="font-size:0.78rem;color:#6b5a4a">（本报记者注：这套系统的使用方式——跟人说话，说想法就出图——与本报连日来观察到的墨先生行为，高度吻合。）</span></div><div class="feature-badge">📌 关键线索 · 西洋新技术的核心能力</div><div class="newspaper-body" style="text-align:left;font-size:0.82rem"><b>请思考：</b>西洋期刊描述的这套系统，和墨先生的行为——<b>说想法就出图、改颜色一句话搞定、海量模板随手取用</b>——最核心的共同点是什么？</div><div class="options" style="gap:0.8rem"><button class="option-card" onclick="onPuzzle2bWrongA()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">👥</span><span class="option-text">这套系统本质上是一个外包平台，背后有大量设计师在接单</span><span class="option-arrow">→</span></button><button class="option-card" onclick="onPuzzle2bRight()" style="border-color:rgba(108,99,255,0.3)"><span class="option-icon" style="background:rgba(108,99,255,0.15)">🤖</span><span class="option-text"><b>跟机器"对话"就能出图改图，AI替你完成设计工作</b></span><span class="option-arrow">→</span></button><button class="option-card" onclick="onPuzzle2bWrongB()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">📡</span><span class="option-text">墨先生不过是西洋某家科技公司派驻上海的代理商</span><span class="option-arrow">→</span></button></div><div style="display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin:1rem auto 0;padding-top:0.5rem;border-top:1px solid rgba(44,24,16,0.15)"><span style="font-size:0.6rem;color:#6b5a4a">编辑：圈内观察员 · 校对：减负密码组</span><span style="font-size:0.6rem;color:#6b5a4a">第 6 页 / 共 14 页</span></div>`; }
  },

  // ────────────────────────────────────────────────────
  // 第7页：细节干扰 — 技术版分析
  // ────────────────────────────────────────────────────
  7: {
    bg: 'newspaper',
    render() { return `<div class="newspaper-masthead"><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0.3rem"><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">民国二十五年 · 上海</span><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">创 作 内 幕 日 报</span></div><div class="paper-name">创 作 内 幕 日 报</div></div><div class="newspaper-subhead" style="margin-top:0.3rem;border-color:var(--paper-ink)">第7版 · 细节路线</div><div style="background:rgba(28,18,8,0.03);border-left:3px solid rgba(28,18,8,0.2);padding:0.8rem 1.2rem;margin:0.8rem auto;max-width:560px;width:100%"><div style="font-size:0.7rem;font-weight:800;letter-spacing:0.12em;color:#6b5a4a;margin-bottom:0.3rem">技 术 版 · 专 栏</div><div style="font-size:0.72rem;color:#6b5a4a;font-style:italic">本报特约技术编辑 · 拆解墨先生之谜</div></div><div class="newspaper-body" style="text-align:left"><b style="color:var(--paper-accent)">"那张桌子后面，到底发生了什么？"</b><br><br>本报技术版编辑连日蹲守，试图从技术角度还原真相。<br><br>根据多方观察，墨先生的操作流程可以还原如下：<br><br><b>第一步</b>：在一块<b>发光的平板</b>上，用手指点选若干选项。<br><b>第二步</b>：屏幕上出现一张<b>带有文字和图片的版面</b>。<br><b>第三步</b>：墨先生说几句话，屏幕上的版面<b>随之改变</b>——颜色变了、文字改了、图片换了。<br><b>第四步</b>：按下一个按钮，一张<b>排版完整的报纸</b>"凭空"出现。<br><br><b>技术版编辑分析：</b><br><br>"前两步，有可能是某种<b>模板系统</b>——选择一个版式，系统自动填充内容。这在西洋并不新鲜，一九三〇年代已有雏形。"<br><br>"但第三步不同——他<b>说话就能改</b>。模板只能帮你选好框架，不能听懂你'换个活泼颜色'这种描述。"<br><br>"目前已知的排版技术里，没有一种能<b>真正理解人的语言</b>并据此修改版面。除非——<b>这块玻璃板里住着一个'理解人话'的设计师。</b>"</div><div class="feature-badge">🤔 技术编辑：结论尚未出炉</div><div class="newspaper-body" style="text-align:left;font-size:0.82rem"><b>技术编辑自己也说：那个解释"虽然听起来最离谱"。</b><br><br><b>但"最离谱"的，有时候反而是真相。</b><br><br>你读完了整篇技术分析——你觉得，技术编辑的推论哪里出了问题？</div><div class="options" style="gap:0.8rem;margin-top:0.5rem"><button class="option-card" onclick="onPuzzle2cWrongA()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">🗣️</span><span class="option-text">他把AI包装成了"玻璃板里住了个设计师"——说法太玄了，不够科学</span><span class="option-arrow">→</span></button><button class="option-card" onclick="onPuzzle2cWrongB()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">🔍</span><span class="option-text">他前面说"可能是模板系统"是对的，后面又说"模板做不到"——前后矛盾</span><span class="option-arrow">→</span></button><button class="option-card" onclick="onPuzzle2cRight()" style="border-color:rgba(108,99,255,0.3)"><span class="option-icon" style="background:rgba(108,99,255,0.15)">💡</span><span class="option-text"><b>他用旧的逻辑在分析新东西——"理解人话的设计师"不是答案，一种能理解人话的机器才是</b></span><span class="option-arrow">→</span></button></div><div style="display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin:1rem auto 0;padding-top:0.5rem;border-top:1px solid rgba(44,24,16,0.15)"><span style="font-size:0.6rem;color:#6b5a4a">编辑：圈内观察员 · 校对：减负密码组</span><span style="font-size:0.6rem;color:#6b5a4a">第 7 页 / 共 14 页</span></div>`; }
  },

  // ────────────────────────────────────────────────────
  // 第8页：谜题3 — 海量免费高质量模板
  // ────────────────────────────────────────────────────
  8: {
    bg: 'newspaper',
    render() { return `<div class="newspaper-masthead"><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0.3rem"><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">民国二十五年 · 上海</span><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">创 作 内 幕 日 报</span></div><div class="paper-name">创 作 内 幕 日 报</div></div><div class="newspaper-subhead" style="margin-top:0.3rem;border-color:var(--paper-ink)">第8版 · 双路线共用</div><div class="newspaper-body" style="text-align:left"><b style="color:var(--paper-accent)">线索三 · 本报记者卧底发现</b><br><br>记者趁墨先生去茶水间的间隙，拍下了他桌上摊开的一本厚册子。<br><br>册子上密密麻麻列满了<b>版式、字体、图案</b>的名字，每一类下面还有几百个选项。<br><br>"这叫模板库。" 墨先生回来后若无其事地说，<b>"要什么，直接拿。"</b><br><br>记者粗略数了数——仅"海报"一个分类下，就超过<b>上千个</b>不同风格和尺寸的版式。<br><br><span style="font-size:0.82rem;color:#6b5a4a;font-style:italic">街上有传言说，那本册子上写的根本不是中文，而是一种"密码"。每一个密码词，都对应着一个完整的设计方案。</span><br><br><b style="color:var(--paper-accent)">记者在手册的扉页上，发现了四个反复出现的词——它们似乎是这座"素材仓库"的关键：</b></div><div class="answer-row" style="margin:1rem auto;max-width:520px;width:100%"><div style="background:rgba(28,18,8,0.05);border:1px solid rgba(28,18,8,0.15);border-radius:12px;padding:1rem;text-align:center"><span style="font-size:0.72rem;color:#6b5a4a;display:block;margin-bottom:0.5rem">手册扉页上的四个关键词</span><span style="font-size:1rem;font-weight:700;color:var(--paper-ink);line-height:2.2;display:block;letter-spacing:0.15em">模 板 · 海 量 · 免 费 · 字 体 库</span></div></div><div class="newspaper-body" style="text-align:left;font-size:0.82rem"><b>请将这四个词，排列成一句最通顺的描述：</b></div><div class="options" style="gap:0.7rem;margin-top:0.8rem"><button class="option-card" onclick="onPuzzle3Right()" style="border-color:rgba(108,99,255,0.3)"><span class="option-icon" style="background:rgba(108,99,255,0.15)">📚</span><span class="option-text">模板海量，免费，还有字体库</span><span class="option-arrow">→</span></button><button class="option-card" onclick="onPuzzle3WrongA()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">📝</span><span class="option-text">字体库免费，模板很多，海量精选，只此一家</span><span class="option-arrow">→</span></button><button class="option-card" onclick="onPuzzle3WrongB()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">🖼️</span><span class="option-text">免费模板，海量素材，字体随便挑，全在里面</span><span class="option-arrow">→</span></button></div><div style="display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin:1rem auto 0;padding-top:0.5rem;border-top:1px solid rgba(44,24,16,0.15)"><span style="font-size:0.6rem;color:#6b5a4a">编辑：圈内观察员 · 校对：减负密码组</span><span style="font-size:0.6rem;color:#6b5a4a">第 8 页 / 共 14 页</span></div>`; }
  },

  // ────────────────────────────────────────────────────
  // 第9页：细节干扰 — 读者来信
  // ────────────────────────────────────────────────────
  9: {
    bg: 'newspaper',
    render() { return `<div class="newspaper-masthead"><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0.3rem"><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">民国二十五年 · 上海</span><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">创 作 内 幕 日 报</span></div><div class="paper-name">创 作 内 幕 日 报</div></div><div class="newspaper-subhead" style="margin-top:0.3rem;border-color:var(--paper-ink)">第9版 · 细节路线</div><div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.15);border-radius:12px;padding:1.2rem;margin:1rem auto;max-width:560px;width:100%"><div style="font-size:0.7rem;font-weight:800;letter-spacing:0.12em;color:#6b5a4a;margin-bottom:0.6rem">读 者 来 信</div><div style="font-size:0.78rem;color:#6b5a4a;margin-bottom:0.8rem;font-style:italic">本报收到一位自称"老设计"的读者来信——</div><div style="font-size:0.88rem;color:var(--paper-ink);line-height:1.9">"你们说的那些'免费模板'，根本站不住脚。<br><br>我做设计这行十几年，没见过哪个大公司会免费放几千套模板给人用。那些所谓的'免费'，背后一定有别的收费方式——要么年费，要么高级功能要钱，要么是用完了就收费。<br><br>我敢打赌，墨先生的'免费模板库'，迟早是要收费的。所谓的'海量免费'，不过是个吸引人的噱头。"<br><br><span style="font-size:0.78rem;color:#6b5a4a">—— 读者"老设计" · 上海闸北</span></div></div><div class="newspaper-body" style="text-align:left;margin-top:1rem;font-size:0.82rem"><b>编辑注：</b><br>"老设计"的分析有一定道理。天下没有免费的午餐。<br>但如果这封信说的不完全是真相呢——如果那些素材<b>真的就是免费的</b>呢？<br>读者们，你们怎么看？</div><div class="options" style="gap:0.8rem;margin-top:0.8rem"><button class="option-card" onclick="onInterfWrongC()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">💰</span><span class="option-text">老设计说得对，世上没有免费的午餐，免费模板背后一定有收费</span><span class="option-arrow">→</span></button><button class="option-card" onclick="onInterfWrongD()" style="border-color:rgba(139,37,0,0.15)"><span class="option-icon" style="background:rgba(139,37,0,0.1)">📰</span><span class="option-text">老设计以自己十几年的经验判断，但时代已经变了，不能拿旧逻辑套新事物</span><span class="option-arrow">→</span></button><button class="option-card" onclick="onInterfRightB()" style="border-color:rgba(108,99,255,0.3)"><span class="option-icon" style="background:rgba(108,99,255,0.15)">🔍</span><span class="option-text"><b>他说的是老一套的逻辑——但墨先生这块玻璃板本身就是新的逻辑，不能用旧经验判断</b></span><span class="option-arrow">→</span></button></div><div style="display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin:1rem auto 0;padding-top:0.5rem;border-top:1px solid rgba(44,24,16,0.15)"><span style="font-size:0.6rem;color:#6b5a4a">编辑：圈内观察员 · 校对：减负密码组</span><span style="font-size:0.6rem;color:#6b5a4a">第 9 页 / 共 14 页</span></div>`; }
  },

  // ────────────────────────────────────────────────────
  // 第10页：速通衔接
  // ────────────────────────────────────────────────────
  10: {
    bg: 'newspaper',
    render() { return `<div class="newspaper-masthead"><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0.3rem"><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">民国二十五年 · 上海</span><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">创 作 内 幕 日 报</span></div><div class="paper-name">创 作 内 幕 日 报</div></div><div class="newspaper-subhead" style="margin-top:0.3rem;border-color:var(--paper-ink)">第10版 · 速通路线</div><div class="newspaper-body" style="text-align:left">恭喜！三条线索全部破解——<br><br>✅ 线索1：<b style="color:var(--paper-accent)">零门槛</b> — 墨先生那块玻璃板让普通人不用学手艺也能做设计<br>✅ 线索2：<b style="color:var(--paper-accent)">AI对话改图</b> — 说句话就出图改图，像聊天一样<br>✅ 线索3：<b style="color:var(--paper-accent)">海量模板</b> — 模板海量、免费，还有字体库<br><br>三个谜团都已解开，墨先生之谜只剩<b>最后一块拼图</b>——<br><br>墨先生一个人，用一块玻璃板，就把排版、设计、找素材、改图——<b>全部在一个地方搞定了</b>。<br><br>没有印厂，没有排版师傅，没有外稿，没有七八个软件来回切。<br><br><b style="color:var(--paper-accent)">这块玻璃板到底是什么？三个线索要拼成什么完整的故事？</b><br><br>─────────<br><span style="font-size:0.82rem;color:#6b5a4a;font-style:italic">编辑提示：第4页那封密信、第7页技术版分析、第9页读者来信——那些看起来像干扰的信息，其实也在告诉你一些东西。回头再看一遍，也许会发现一个更大的答案。</span><br>─────────<br><br>真相就在下一页——</div><button class="newspaper-btn" onclick="goTo(12)" style="margin-top:1rem">⚡ 看速通真相 →</button><div style="display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin:1rem auto 0;padding-top:0.5rem;border-top:1px solid rgba(44,24,16,0.15)"><span style="font-size:0.6rem;color:#6b5a4a">编辑：圈内观察员 · 校对：减负密码组</span><span style="font-size:0.6rem;color:#6b5a4a">第 10 页 / 共 14 页</span></div>`; }
  },

  // ────────────────────────────────────────────────────
  // 第11页：细节衔接
  // ────────────────────────────────────────────────────
  11: {
    bg: 'newspaper',
    render() { return `<div class="newspaper-masthead"><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0.3rem"><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">民国二十五年 · 上海</span><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">创 作 内 幕 日 报</span></div><div class="paper-name">创 作 内 幕 日 报</div></div><div class="newspaper-subhead" style="margin-top:0.3rem;border-color:var(--paper-ink)">第11版 · 细节路线</div><div class="newspaper-body" style="text-align:left">恭喜！三条线索全部破解——<br><br>✅ 线索1：<b style="color:var(--paper-accent)">AI随心改</b> — 说想法就出图，边聊边改，设计像聊天一样<br>✅ 线索2：<b style="color:var(--paper-accent)">海量模板</b> — 模板海量，免费，字体库随便用<br>✅ 线索3：<b style="color:var(--paper-accent)">一站式平台</b> — 不用切七八个软件，一个地方全搞定<br><br>三个谜团全部还原，墨先生之谜的答案已经呼之欲出——<br><br><b style="color:var(--paper-accent)">但还有一个更大的悬念没有解开：</b><br><br>那块玻璃板到底是什么？它从哪里来？为什么偏偏是墨先生得到了它？<br><br>本报记者在墨先生的废纸篓里，发现了一张<b>撕碎的包装纸</b>——上面隐约印着几个英文字母……<br><br><span style="font-size:0.88rem;color:#6b5a4a;font-style:italic">本报追踪了十几天，发现墨先生身上的谜团不止一个——<br>关于那块玻璃板的来源，本报还在调查中。<br>一个完整的真相，需要同时看清<b>功能、使用方式和这个人</b>。</span><br><br><b>深度真相就在下一页——</b></div><button class="newspaper-btn" onclick="goTo(13)" style="margin-top:1rem">🔬 看深度真相 →</button><div style="display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin:1rem auto 0;padding-top:0.5rem;border-top:1px solid rgba(44,24,16,0.15)"><span style="font-size:0.6rem;color:#6b5a4a">编辑：圈内观察员 · 校对：减负密码组</span><span style="font-size:0.6rem;color:#6b5a4a">第 11 页 / 共 14 页</span></div>`; }
  },

  // ────────────────────────────────────────────────────
  // 第12页：速通真相结局
  // ────────────────────────────────────────────────────
  12: {
    bg: 'newspaper',
    render() { return `<div class="newspaper-masthead"><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0.3rem"><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">民国二十五年 · 上海</span><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">创 作 内 幕 日 报</span></div><div class="paper-name">创 作 内 幕 日 报</div></div><div style="text-align:center;margin:0.3rem 0"><span style="display:inline-block;background:var(--paper-accent);color:var(--paper);font-size:0.62rem;font-weight:800;letter-spacing:0.15em;padding:0.15rem 0.9rem;border-radius:2px">独 家 头 条 · 全 网 首 发</span></div><div class="newspaper-headline">⚡ 速通真相</div><div class="newspaper-body" style="text-align:center;margin-bottom:0.8rem;font-size:clamp(0.95rem,3.2vw,1.15rem);color:var(--paper-ink);font-weight:600">墨先生之谜，速通版还原——<br>两个使用者的真实场景：</div><div class="newspaper-divider"></div><div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.15);border-radius:12px;padding:1.2rem 1.4rem;margin:1rem auto;max-width:520px;width:100%"><div style="font-size:0.75rem;font-weight:800;color:var(--paper-ink);margin-bottom:0.6rem">📖 场景一 · "明天就要交"</div><div style="font-size:0.88rem;color:var(--paper-ink);line-height:1.9;font-style:italic">"我是社团宣传部的小林，明天就是社团招新日，海报还没做。<br><br>以前这种事要熬到凌晨两三点——找模板、调字体、改颜色、重新排版，每一个步骤都要学。<br><br>这次我找到了墨先生那块玻璃板。我跟它说'帮我做一张音乐节招新海报，活泼一点'——半分钟就出了初稿。我说'把标题放大、颜色再亮一点'——立刻改好。字体和贴图全在里面，不用到处找。最后导出三种尺寸，公众号、朋友圈、招新展架，一键搞定。<br><br>以前要熬夜到三点。现在呢？——<b>三分钟，从想法到成品。</b>"</div></div><div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.15);border-radius:12px;padding:1.2rem 1.4rem;margin:1rem auto;max-width:520px;width:100%"><div style="font-size:0.75rem;font-weight:800;color:var(--paper-ink);margin-bottom:0.6rem">📖 场景二 · "想改就改"</div><div style="font-size:0.88rem;color:var(--paper-ink);line-height:1.9;font-style:italic">"我是做自媒体的阿晨，每周要出三篇小红书笔记，封面每次都要改好几个版本。<br><br>以前每一版封面都要重新打开设计软件，调参数，重新导出一遍又一遍。<br><br>现在我打开墨先生那块玻璃板，跟它说'换个春天的配色'——它立刻给我三个版本。说'字再大一点'——秒改。说'加个边框'——就有了。<br><br>像聊天一样改稿，<b>没有次数限制，没有等待时间。</b>"</div></div><div style="background:rgba(139,37,0,0.06);border:1px solid rgba(139,37,0,0.15);border-radius:12px;padding:1.2rem;margin:1rem auto;max-width:500px;width:100%;text-align:center"><div style="font-size:0.78rem;color:var(--paper-ink);margin-bottom:0.4rem;font-weight:700">墨先生之谜的核心</div><div style="font-size:0.82rem;color:#6b5a4a;line-height:1.8">那块玻璃板让普通人零门槛进设计，<br>AI对话让修改零成本，<br>海量免费模板让灵感零等待，<br>一站式平台让流程零折腾。</div><div style="font-size:0.85rem;font-weight:800;color:var(--paper-accent);margin-top:0.6rem">从想法到成品，一个地方，三分钟搞定。</div></div><div style="font-size:0.88rem;font-weight:700;color:var(--paper-ink);text-align:center;margin-top:0.8rem;font-style:italic">原来，快就是最大的减负</div><button class="newspaper-btn" onclick="goTo(14)" style="margin-top:1.5rem">🔓 揭晓终极秘密</button><div style="display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin:1rem auto 0;padding-top:0.5rem;border-top:1px solid rgba(44,24,16,0.15)"><span style="font-size:0.6rem;color:#6b5a4a">编辑：圈内观察员 · 校对：减负密码组</span><span style="font-size:0.6rem;color:#6b5a4a">第 12 页 / 共 14 页</span></div>`; }
  },

  // ────────────────────────────────────────────────────
  // 第13页：细节真相结局
  // ────────────────────────────────────────────────────
  13: {
    bg: 'newspaper',
    render() { return `<div class="newspaper-masthead"><div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0.3rem"><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">民国二十五年 · 上海</span><span style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em">创 作 内 幕 日 报</span></div><div class="paper-name">创 作 内 幕 日 报</div></div><div style="text-align:center;margin:0.3rem 0"><span style="display:inline-block;background:var(--paper-accent);color:var(--paper);font-size:0.62rem;font-weight:800;letter-spacing:0.15em;padding:0.15rem 0.9rem;border-radius:2px">深 度 报 道 · 全 网 首 发</span></div><div class="newspaper-headline">🔬 深度真相</div><div class="newspaper-body" style="text-align:center;margin-bottom:0.8rem;font-size:clamp(0.95rem,3.2vw,1.15rem);color:var(--paper-ink);font-weight:600">墨先生之谜，深度版还原——<br>三个线索，一个完整的创作工作流：</div><div class="newspaper-divider"></div><div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.15);border-radius:12px;padding:1.2rem 1.4rem;margin:1rem auto;max-width:520px;width:100%"><div style="font-size:0.75rem;font-weight:800;color:var(--paper-ink);margin-bottom:0.6rem">📖 完整使用场景 · 来自读者"阿文"的自述</div><div style="font-size:0.88rem;color:var(--paper-ink);line-height:1.9;font-style:italic">"我是一个刚毕业的大学生，在一个小公司做运营。明天要交一张活动海报、发三篇小红书笔记、出一篇公众号推文。<br><br><b>以前的日子是这样的：</b><br>早上九点打开电脑——先找PS做海报，花两个小时。然后去找字体网站，找免费可商用的字体，又四十分钟。接着去图库找配图，买了几张图，花了半小时。然后用秀米排版公众号，调整格式和配色，一小时过去了。最后剪映打开，剪个短视频版本，又折腾一个半小时。<br>七八个软件之间切来切去，手机、电脑、U盘来回传文件。<br><br>晚上十一点，我终于坐在椅子上——<b>还在改。</b><br><br><b>后来我看到了墨先生的故事。</b><br><br>我找到了那块玻璃板。我跟它说'帮我做一张音乐节海报'——半分钟出了初稿。说'换个更活泼的颜色'——立刻改了。字体和贴图全在里面，不用到处找。最后导出小红书、公众号、抖音三种尺寸，一键搞定。<br><br><b>以前要七八个软件、熬到凌晨两点。</b><br><b>现在呢？——一个平台，半小时，从想法到成品。</b>"</div></div><div class="feature-badge" style="margin:1rem auto;max-width:520px;width:100%;display:flex;justify-content:center">🔍 四个功能 · 一个场景 · 完美融合</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:0.7rem;max-width:500px;width:100%;margin:1rem auto"><div style="background:rgba(28,18,8,0.05);border:1px solid rgba(28,18,8,0.15);border-radius:12px;padding:0.9rem;text-align:center"><div style="font-size:1.3rem;margin-bottom:0.3rem">🖱️</div><div style="font-size:0.72rem;font-weight:700;color:var(--paper-ink)">零门槛</div><div style="font-size:0.65rem;color:#6b5a4a;margin-top:0.15rem">拖拽就行 不用学直接会</div></div><div style="background:rgba(28,18,8,0.05);border:1px solid rgba(28,18,8,0.15);border-radius:12px;padding:0.9rem;text-align:center"><div style="font-size:1.3rem;margin-bottom:0.3rem">💬</div><div style="font-size:0.72rem;font-weight:700;color:var(--paper-ink)">AI随心改</div><div style="font-size:0.65rem;color:#6b5a4a;margin-top:0.15rem">说想法就出图 边聊边改</div></div><div style="background:rgba(28,18,8,0.05);border:1px solid rgba(28,18,8,0.15);border-radius:12px;padding:0.9rem;text-align:center"><div style="font-size:1.3rem;margin-bottom:0.3rem">📚</div><div style="font-size:0.72rem;font-weight:700;color:var(--paper-ink)">海量素材</div><div style="font-size:0.65rem;color:#6b5a4a;margin-top:0.15rem">模板免费 随手就能用</div></div><div style="background:rgba(28,18,8,0.05);border:1px solid rgba(28,18,8,0.15);border-radius:12px;padding:0.9rem;text-align:center"><div style="font-size:1.3rem;margin-bottom:0.3rem">🎯</div><div style="font-size:0.72rem;font-weight:700;color:var(--paper-ink)">一站式</div><div style="font-size:0.65rem;color:#6b5a4a;margin-top:0.15rem">不换地方 从灵感到发布</div></div></div><div style="background:rgba(28,18,8,0.03);border-top:1px solid rgba(44,24,16,0.12);padding:1rem 1.4rem;margin:1.2rem auto;max-width:520px;width:100%;text-align:center"><div style="font-size:0.78rem;color:#6b5a4a;line-height:1.8;font-style:italic"><b>* 尾声 *</b><br><br>那张撕碎的包装纸上，能辨认出的字母只有 "C-A-N-V-A"。<br>墨先生到底是谁？他从哪里来？<br>那个玻璃板又是什么来历……<br><br>这些问题，本报将继续追踪调查。</div></div><div style="font-size:0.88rem;font-weight:700;color:var(--paper-ink);text-align:center;margin-top:0.8rem;font-style:italic">原来，一个完整的使用场景 = 四个功能的完美融合</div><button class="newspaper-btn" onclick="goTo(14)" style="margin-top:1.5rem">🔓 揭晓终极秘密</button><div style="display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin:1rem auto 0;padding-top:0.5rem;border-top:1px solid rgba(44,24,16,0.15)"><span style="font-size:0.6rem;color:#6b5a4a">编辑：圈内观察员 · 校对：减负密码组</span><span style="font-size:0.6rem;color:#6b5a4a">第 13 页 / 共 14 页</span></div>`; }
  },

  // ────────────────────────────────────────────────────
  // 第14页：品牌收尾
  // ────────────────────────────────────────────────────
  14: {
    bg: 'newspaper',
    render() { return `<div style="text-align:center;margin-bottom:0.5rem"><span style="font-size:0.75rem;font-weight:800;letter-spacing:0.2em;color:var(--paper-accent)">CANVA · 大广赛命题</span></div><div class="newspaper-headline" style="font-size:clamp(2rem,8vw,3.5rem);text-decoration:underline;text-decoration-style:wavy;text-underline-offset:6px">Canva可画</div><div style="text-align:center;font-size:0.95rem;color:#6b5a4a;margin-bottom:0.3rem;font-style:italic">赋予世界设计的力量</div><div style="text-align:center;font-size:1.15rem;font-weight:800;color:var(--paper-ink);margin-bottom:1rem">内容创作，从这里开始</div><div style="background:rgba(28,18,8,0.04);border:1px solid rgba(28,18,8,0.15);border-radius:12px;padding:1.2rem 1.4rem;margin:0 auto 1.5rem;max-width:520px;width:100%;text-align:center"><div style="font-size:0.78rem;color:#6b5a4a;line-height:1.8;font-style:italic"><b>墨先生之谜·终</b><br><br>那块玻璃板，来自一个叫 Canva 的地方。<br>墨先生不是魔术师，不是排版师傅，也不是什么秘密团队。<br>他只是比别人早一步——<b>找到了让创作变简单的方法。</b><br><br>你呢？<br>你明天的海报、笔记、推文，打算用什么来完成？</div></div><div style="display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap;margin-bottom:2rem"><span style="font-size:0.82rem;padding:0.3rem 0.9rem;border-radius:50px;background:rgba(28,18,8,0.08);color:var(--paper-ink);border:1px solid rgba(28,18,8,0.2)">🖱️ 零门槛 · 新手友好</span><span style="font-size:0.82rem;padding:0.3rem 0.9rem;border-radius:50px;background:rgba(28,18,8,0.08);color:var(--paper-ink);border:1px solid rgba(28,18,8,0.2)">💬 AI对话设计</span><span style="font-size:0.82rem;padding:0.3rem 0.9rem;border-radius:50px;background:rgba(28,18,8,0.08);color:var(--paper-ink);border:1px solid rgba(28,18,8,0.2)">📚 海量免费素材</span><span style="font-size:0.82rem;padding:0.3rem 0.9rem;border-radius:50px;background:rgba(28,18,8,0.08);color:var(--paper-ink);border:1px solid rgba(28,18,8,0.2)">🎯 一站式体验</span></div><div style="display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin:0 auto 1.5rem;padding-top:0.5rem;border-top:1px solid rgba(44,24,16,0.15)"><span style="font-size:0.6rem;color:#6b5a4a">编辑：圈内观察员 · 校对：减负密码组</span><span style="font-size:0.6rem;color:#6b5a4a">第 14 页 / 共 14 页</span></div><button class="newspaper-btn" onclick="goTo(1)" style="animation:fadeUp 0.6s ease 1.1s both">🔄 从头再来</button>`; }
  }
};

// ══════════════════════════════════════
// 谜题交互
// ══════════════════════════════════════

// ── 谜题1：小白必备·新手友好 ──
function onPuzzle1Right() { goTo(5); }
function onPuzzle1WrongA() { openClue('clue-1a'); }
function onPuzzle1WrongB() { openClue('clue-1b'); }

// ── 谜题2速通版：对话式AI设计 ──
function onPuzzle2Right() { goTo(10); }
function onPuzzle2WrongA() { openClue('clue-2a'); }
function onPuzzle2WrongB() { openClue('clue-2b'); }

// ── 谜题2深扒版：对话式AI设计 ──
function onPuzzle2bRight() { goTo(8); }
function onPuzzle2bWrongA() { openClue('clue-3a'); }
function onPuzzle2bWrongB() { openClue('clue-3b'); }

// ── 技术版分析干扰（第7页）──
function onPuzzle2cRight() { goTo(8); }
function onPuzzle2cWrongA() { openClue('clue-5a'); }
function onPuzzle2cWrongB() { openClue('clue-5b'); }

// ── 谜题3：海量免费模板 ──
function onPuzzle3Right() { goTo(11); }
function onPuzzle3WrongA() { openClue('clue-6a'); }
function onPuzzle3WrongB() { openClue('clue-6b'); }

// ── 密信干扰（第4页）──
function onInterfRight() { goTo(5); }
function onInterfWrongA() { openClue('clue-4a'); }
function onInterfWrongB() { openClue('clue-4b'); }

// ── 读者来信干扰（第9页）──
function onInterfRightB() { goTo(11); }
function onInterfWrongC() { openClue('clue-9a'); }
function onInterfWrongD() { openClue('clue-9b'); }

// ══════════════════════════════════════
// 初始化
// ══════════════════════════════════════
function init() {
  const app = document.getElementById('app');
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  progressBar.innerHTML = '<div class="progress-fill" id="progress-fill"></div>';
  document.body.appendChild(progressBar);

  const indicator = document.createElement('div');
  indicator.className = 'page-indicator';
  indicator.id = 'page-indicator';
  indicator.textContent = '1 / 14';
  document.body.appendChild(indicator);

  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const page = PAGES[i];
    const el = document.createElement('div');
    el.className = `page${i === 1 ? ' active' : ''}`;
    el.id = `page-${i}`;
    if (page.bg) el.classList.add('page-' + page.bg);
    el.innerHTML = page.render();
    app.appendChild(el);
  }

  updateProgress();
}

document.addEventListener('DOMContentLoaded', init);
