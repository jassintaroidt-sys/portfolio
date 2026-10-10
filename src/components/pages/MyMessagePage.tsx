export function MyMessagePage(): JSX.Element {
  return (
    <div
      className="w-full max-w-3xl mx-auto py-8 px-4 md:px-8 select-none"
      data-lenis-prevent
    >
      {/* Notebook Paper Sheet Container with Blue Horizontal Ruled Lines & Pink Margin Line */}
      <div
        className="relative w-full rounded-lg p-8 md:p-14 overflow-hidden"
        style={{
          backgroundColor: '#FFFDF9',
          backgroundImage: `
            linear-gradient(to right, transparent 68px, #FF8DC7 68px, #FF8DC7 70px, transparent 70px),
            repeating-linear-gradient(180deg, transparent 0, transparent 31px, #8FB8E8 31px, #8FB8E8 32px)
          `,
          boxShadow: `
            0 16px 36px rgba(0,0,0,0.18),
            0 2px 6px rgba(0,0,0,0.06),
            inset 0 0 24px rgba(255, 238, 220, 0.4)
          `,
          lineHeight: '32px',
        }}
      >
        {/* Notebook Left Binder Hole Punches */}
        <div className="absolute left-6 inset-y-0 flex flex-col justify-around pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full bg-[#E5D4C0] border border-black/20 shadow-inner"
            />
          ))}
        </div>

        {/* Heartfelt Letter Text in Caveat Handwriting Font */}
        <div
          className="pl-14 md:pl-20 text-[#2A0F2E] space-y-6"
          style={{ fontFamily: 'Caveat, cursive', fontSize: '24px' }}
        >
          {/* Header Title */}
          <h2
            className="text-3xl md:text-4xl font-bold text-[#E5173F] pb-2 leading-tight"
            style={{ fontFamily: 'Caveat, cursive' }}
          >
            To Those Who Believe in the Power of a Story
          </h2>

          <p>Thank you for stopping by.</p>

          <p>
            In a world that moves relentlessly fast, attention has become one of the most valuable things we have.
          </p>

          <p>
            A single second can determine whether someone stops, looks, remembers—or simply scrolls away.
          </p>

          <p>That is where I believe creativity matters.</p>

          <p>
            I work at the intersection of strategy, storytelling, and visual expression as a Social Media Specialist, Content Creator, Videographer, and Graphic Designer.
          </p>

          <p>I believe great content is not simply about looking beautiful.</p>

          <div className="pl-4 border-l-2 border-[#FF2E93] italic space-y-1">
            <p>It needs a reason to exist.</p>
            <p>Something worth saying.</p>
            <p>Someone worth speaking to.</p>
            <p>And, most importantly, something worth leaving behind.</p>
          </div>

          <p>Because behind every brand, there are people.</p>

          <div className="space-y-1">
            <p>Behind every business, there is a journey.</p>
            <p>Behind every product, there is a story.</p>
            <p>And behind every screen, there is someone looking for something to feel, discover, or remember.</p>
          </div>

          <p>That is why I never see content as merely <em>content</em>.</p>

          <p>I see it as part of an experience.</p>

          <div className="space-y-1">
            <p>I look for the idea behind the brief.</p>
            <p>The story behind the numbers.</p>
            <p>The meaning behind the visual.</p>
            <p>And the possibility within something that may seem simple at first glance.</p>
          </div>

          <div className="bg-[#FFE5F0]/70 p-4 rounded-lg space-y-2 text-[#C2185B] font-semibold">
            <p>&ldquo;If you come with a brand, I want to help give it a voice.&rdquo;</p>
            <p>&ldquo;If you come with an idea, I want to help give it form.&rdquo;</p>
            <p>&ldquo;If you come with a story, I want to help make it worth hearing.&rdquo;</p>
          </div>

          <p>I don&apos;t know what our project might become.</p>

          <div className="space-y-1">
            <p>Perhaps a campaign.</p>
            <p>Perhaps a visual identity.</p>
            <p>Perhaps one film.</p>
            <p>Perhaps dozens of pieces of content.</p>
            <p>Or perhaps something we haven&apos;t imagined yet.</p>
          </div>

          <p>But I believe the most meaningful work often begins with something simple:</p>

          <p className="text-2xl md:text-3xl font-bold text-[#FF2E93] italic my-3">
            &ldquo;Two people, two minds, or two teams who share the desire to create something that matters.&rdquo;
          </p>

          <p>
            So, if you&apos;re looking for someone to simply execute a brief, perhaps I&apos;m not the person you&apos;re looking for.
          </p>

          <p>
            But if you&apos;re looking for someone who wants to <strong>understand, think, create, and grow</strong> alongside an idea,
          </p>

          <p className="text-xl md:text-2xl text-[#E5173F] font-bold">
            &ldquo;I would love to hear your story.&rdquo;
          </p>

          {/* Call to action & signature */}
          <div className="pt-8 border-t border-[#FF8DC7]/40 flex flex-col items-end">
            <h1
              className="text-3xl md:text-4xl font-extrabold text-[#FF2E93]"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              Let&apos;s create something worth remembering
            </h1>
            <span
              className="text-4xl md:text-5xl font-normal text-[#2A0F2E] mt-4"
              style={{ fontFamily: 'Pinyon Script, cursive' }}
            >
              Jassinta Roid Triniti
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
