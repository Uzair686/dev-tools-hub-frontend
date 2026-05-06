"use client";

import { useState, useCallback } from "react";
import BackButton from "@/components/BackButton";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function PasswordGenerator() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [useUppercase, setUseUppercase] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState("");

    const getStrength = (pass: string) => {
        let score = 0;
        if (pass.length >= 12) score++;
        if (pass.length >= 16) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^a-zA-Z0-9]/.test(pass)) score++;

        if (score <= 2) return "Weak";
        if (score <= 3) return "Fair";
        if (score <= 4) return "Strong";
        return "Very Strong";
    };

    const strengthColor: Record<string, string> = {
        Weak: "text-red-500",
        Fair: "text-orange-500",
        Strong: "text-blue-500",
        "Very Strong": "text-green-500",
    };

    const strengthBar: Record<string, string> = {
        Weak: "w-1/4 bg-red-500",
        Fair: "w-2/4 bg-orange-500",
        Strong: "w-3/4 bg-blue-500",
        "Very Strong": "w-full bg-green-500",
    };

    const generatePassword = useCallback(() => {
        let charset = LOWERCASE;
        if (useUppercase) charset += UPPERCASE;
        if (useNumbers) charset += NUMBERS;
        if (useSymbols) charset += SYMBOLS;

        let result = "";
        for (let i = 0; i < length; i++) {
            result += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(result);
        setStrength(getStrength(result));
        setCopied(false);
    }, [length, useUppercase, useNumbers, useSymbols]);

    const copyToClipboard = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <BackButton />

            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">🔐</span>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        Password Generator
                    </h1>
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                    Generate strong, secure passwords with custom rules instantly.
                </p>
            </div>

            <div className="max-w-xl mx-auto flex flex-col gap-6">

                {/* Password Display */}
                <div className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-center justify-between gap-4">
                        <span className="font-mono text-lg text-slate-900 dark:text-white break-all">
                            {password || "Click Generate to create a password..."}
                        </span>
                        <button
                            onClick={copyToClipboard}
                            disabled={!password}
                            className="shrink-0 px-3 py-1.5 rounded-lg bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 text-sm font-medium transition-colors disabled:opacity-40"
                        >
                            {copied ? "✅ Copied!" : "📋 Copy"}
                        </button>
                    </div>

                    {/* Strength Bar */}
                    {strength && (
                        <div className="mt-4">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-500 dark:text-slate-400">
                                    Strength
                                </span>
                                <span className={`font-semibold ${strengthColor[strength]}`}>
                                    {strength}
                                </span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${strengthBar[strength]}`}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Length Slider */}
                <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <div className="flex justify-between mb-3">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Password Length
                        </label>
                        <span className="text-sm font-bold text-blue-500">{length}</span>
                    </div>
                    <input
                        type="range"
                        min={6}
                        max={64}
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>6</span>
                        <span>64</span>
                    </div>
                </div>

                {/* Options */}
                <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                        Include Characters
                    </p>
                    <div className="flex flex-col gap-3">
                        {[
                            {
                                label: "Lowercase letters (always on)",
                                sublabel: "abc...xyz — required as base charset",
                                value: true,
                                disabled: true,
                                setter: null,
                            },
                            {
                                label: "Uppercase letters",
                                sublabel: "ABC...XYZ",
                                value: useUppercase,
                                disabled: false,
                                setter: setUseUppercase,
                            },
                            {
                                label: "Numbers",
                                sublabel: "0-9",
                                value: useNumbers,
                                disabled: false,
                                setter: setUseNumbers,
                            },
                            {
                                label: "Symbols",
                                sublabel: "!@#$%^&*",
                                value: useSymbols,
                                disabled: false,
                                setter: setUseSymbols,
                            },
                        ].map((option) => (
                            <div
                                key={option.label}
                                className="flex items-center justify-between"
                            >
                                <div>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                        {option.label}
                                    </p>
                                    <p className="text-xs text-slate-400">{option.sublabel}</p>
                                </div>
                                <button
                                    disabled={option.disabled}
                                    onClick={() => option.setter && option.setter(!option.value)}
                                    className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${option.value
                                            ? "bg-blue-500"
                                            : "bg-slate-300 dark:bg-slate-600"
                                        } ${option.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    <span
                                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${option.value ? "translate-x-6" : "translate-x-0.5"
                                            }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Generate Button */}
                <button
                    onClick={generatePassword}
                    className="w-full py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold text-lg transition-all shadow-lg shadow-blue-500/20"
                >
                    🔐 Generate Password
                </button>
            </div>
        </div>
    );
}