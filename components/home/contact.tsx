'use client'

export default function Contact() {
  return (
    <div id="contact" className="relative isolate bg-background px-6 py-24 sm:py-32 lg:px-8">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-border [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-64}
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-64} className="overflow-visible fill-muted">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      <div className="mx-auto max-w-xl lg:max-w-4xl">
        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
          联系我们的团队
        </h2>
        <p className="mt-2 text-lg/8 text-muted-foreground">
          对 AI 创作功能有疑问？需要技术支持或自定义解决方案？我们随时为您提供帮助。
        </p>
        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <form action="#" method="POST" className="lg:flex-auto">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-foreground">
                  姓
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-background px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground/60 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-foreground">
                  名
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-background px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground/60 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-semibold text-foreground">
                  邮箱
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-background px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground/60 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm/6 font-semibold text-foreground">
                  公司/组织
                </label>
                <div className="mt-2.5">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="block w-full rounded-md bg-background px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground/60 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm/6 font-semibold text-foreground">
                  留言
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="告诉我们您的需求或问题"
                    className="block w-full rounded-md bg-background px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground/60 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus:outline-primary"
              >
                发送消息
              </button>
            </div>
            <p className="mt-4 text-sm/6 text-muted-foreground">
              提交此表单即表示我同意{' '}
              <a href="#" className="font-semibold text-primary">
                隐私政策
              </a>
              。
            </p>
          </form>
          <div className="lg:mt-6 lg:w-80 lg:flex-none">
            <img
              alt="AI 创作平台"
              src="https://tailwindcss.com/plus-assets/img/logos/workcation-logo-indigo-600.svg"
              className="h-12 w-auto"
            />
            <figure className="mt-10">
              <blockquote className="text-lg/8 font-semibold text-foreground">
                <p>
                  "这个 AI 创作平台太棒了！几秒钟就能生成高质量的故事，为我的内容创作节省了大量时间。界面简洁，操作流畅，强烈推荐！"
                </p>
              </blockquote>
              <figcaption className="mt-10 flex gap-x-6">
                <img
                  alt="用户头像"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
                  className="size-12 flex-none rounded-full bg-muted"
                />
                <div>
                  <div className="text-base font-semibold text-foreground">李小雅</div>
                  <div className="text-sm/6 text-muted-foreground">自媒体创作者</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  )
} 