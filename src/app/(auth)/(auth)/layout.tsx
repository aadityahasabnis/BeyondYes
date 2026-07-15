import { FaBrain, FaComments, FaHandshake, FaHeart, FaSeedling } from 'react-icons/fa6';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const features = [
        {
            icon: <FaBrain />,
            label: 'Self Awareness',
        },
        {
            icon: <FaComments />,
            label: 'Communication',
        },
        {
            icon: <FaHandshake />,
            label: 'Healthy Relationships',
        },
        {
            icon: <FaSeedling />,
            label: 'Personal Growth',
        },
    ];

    return (
        <main className="grid min-h-screen lg:grid-cols-2">
            {/* Left Illustration */}

            <section className="relative hidden overflow-hidden border-r bg-muted lg:flex">
                {/* Background */}

                <div className="absolute inset-0">
                    <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border" />

                    <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/70" />

                    <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/60" />

                    <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/50" />
                </div>

                <div className="relative z-10 flex w-full flex-col items-center justify-center px-16">
                    {/* Logo */}

                    <div className="mb-14 flex h-28 w-28 items-center justify-center rounded-full border bg-card shadow-sm">
                        <FaHeart className="text-5xl text-primary" />
                    </div>

                    {/* Heading */}

                    <div className="max-w-md space-y-4 text-center">
                        <h1 className="text-5xl font-bold tracking-tight">BeyondYes</h1>

                        <h2 className="text-2xl font-semibold leading-snug">
                            Better Relationships
                            <br />
                            Begin With Better Understanding
                        </h2>

                        <p className="text-base leading-7 text-muted-foreground">
                            Understand yourself before understanding someone else. Build healthier relationships through self-awareness, communication, and intentional growth.
                        </p>
                    </div>

                    {/* Features */}

                    <div className="mt-16 grid w-full max-w-lg grid-cols-2 gap-4">
                        {features.map((feature) => (
                            <div key={feature.label} className="flex items-center gap-3 rounded-2xl border bg-card px-5 py-4 shadow-sm">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">{feature.icon}</div>

                                <span className="text-sm font-medium">{feature.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Right */}

            <section className="flex min-h-screen items-center justify-center px-6 py-10">{children}</section>
        </main>
    );
}
