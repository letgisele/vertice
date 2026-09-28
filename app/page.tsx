'use client';

import { type SubmitEvent, useEffect, useRef, useState } from 'react';
import {
	ArrowDown,
	ArrowRight,
	ArrowUpRight,
	BarChart3,
	Check,
	Code2,
	Database,
	Download,
	Globe2,
	Menu,
	Moon,
	Plus,
	Send,
	Sparkles,
	Sun,
	Workflow,
	X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { content, type Language } from '@/lib/content';
import { siteConfig, team } from '@/lib/config';

const ids = ['expertise', 'approach', 'about', 'team'];
const icons = [BarChart3, Database, Workflow, Sparkles, Code2];
const asset = (file: string) => `${ process.env.NEXT_PUBLIC_BASE_PATH || '' }/${ file }`;

export default function Home () {
	const [lang, setLang] = useState<Language>('pt'), [dark, setDark] = useState(true), [menu, setMenu] = useState(false), [contact, setContact] = useState(false), [solution, setSolution] = useState<number | null>(null), [half, setHalf] = useState(0), [chat, setChat] = useState(false), [message, setMessage] = useState(''), [messages, setMessages] = useState<{
		role: string;
		text: string
	}[]>([]), [busy, setBusy] = useState(false), [brief, setBrief] = useState('');
	
	const chatEnd = useRef<HTMLDivElement>(null);
	const t = content[lang];
	
	useEffect(() => {
		try {
			const l = localStorage.getItem('vertice-language');
			if (l && l in content) setLang(l as Language);
			setDark(localStorage.getItem('vertice-theme') !== 'light');
		} catch {
		}
	}, []);
	
	useEffect(() => {
		document.documentElement.dataset.theme = dark ? 'dark' : 'light';
	}, [dark]);
	
	useEffect(() => {
		document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
		document.title = `Vértice — ${ t.footer }`;
	}, [lang, t.footer]);
	
	useEffect(() => {
		chatEnd.current?.scrollIntoView({ block: 'nearest' });
	}, [messages, busy]);
	
	function language (l: Language) {
		setLang(l);
		setMessages([]);
		setBrief('');
		try {
			localStorage.setItem('vertice-language', l);
		} catch {
		}
	}
	
	function theme () {
		setDark(!dark);
		try {
			localStorage.setItem('vertice-theme', dark ? 'light' : 'dark');
		} catch {
		}
	}
	
	function form (e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		setBrief(`${ t.name }: ${ data.get('name') }\n${ t.company }: ${ data.get('company') }\n${ t.email }: ${ data.get('email') }\n\n${ t.challenge }\n${ data.get('challenge') }`);
	}
	
	function download () {
		const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
		const a = document.createElement('a');
		a.href = url;
		a.download = 'vertice-project.txt';
		a.click();
		URL.revokeObjectURL(url);
	}
	
	async function ask (text: string) {
		if (!text.trim() || busy) return;
		
		setMessage('');
		setMessages(m => [...m, { role: 'user', text }]);
		setBusy(true);
		let answer = t.aiDefault;
		
		try {
			if (siteConfig.aiEndpoint) {
				const r = await fetch(siteConfig.aiEndpoint, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ message: text, language: lang }),
					signal: AbortSignal.timeout(20000),
				});
				if (!r.ok) throw Error();
				const data = await r.json();
				if (typeof data.reply !== 'string' || !data.reply.trim()) throw Error();
				answer = data.reply;
			} else {
				const q = text.toLowerCase();
				if (/finan|data|dados|datos|bi\b|dashboard|sql|receita/.test(q)) answer = t.aiAnswers[0]; else if (/automat|process|proces|workflow/.test(q)) answer = t.aiAnswers[1]; else if (/\bia\b|\bai\b|chat|agent/.test(q)) answer = t.aiAnswers[2];
			}
		} catch {
			answer = t.aiFail;
		}
		setMessages(m => [...m, { role: 'assistant', text: answer }]);
		setBusy(false);
	}
	
	const rev = half ? [55, 62, 58, 70, 76, 87] : [38, 45, 42, 58, 65, 74];
	const exp = half ? [40, 43, 40, 47, 49, 56] : [28, 30, 29, 38, 42, 49];
	const total = rev.reduce((a, b) => a + b, 0) * 10000;
	const profit = total - exp.reduce((a, b) => a + b, 0) * 10000;
	
	const money = (n: number) => new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US', {
		style: 'currency',
		currency: 'BRL',
		notation: 'compact',
		maximumFractionDigits: 2,
	}).format(n);
	
	return (
		<>
			<a href="#main" className="skip">{ t.skip }</a>
			<header>
				<a href="#" className="logo" aria-label="Vértice">
					<span className="brand-symbol">∨</span>vértice<span className="brand-dot">.</span>
				</a>
				
				<nav aria-label={ t.menu }>
					{ t.nav.map((n, i) => <a key={ n } href={ `#${ ids[i] }` }>{ n }</a>) }
				</nav>
				
				<div className="header-actions">
					<label className="language">
						<Globe2 size={ 14 }/><span className="sr-only">{ t.language }</span>
						<select
							value={ lang }
							onChange={ e => language(e.target.value as Language) }
							aria-label={ t.language }
						>
							<option value="pt">PT</option>
							<option value="en">EN</option>
							<option value="es">ES</option>
						</select>
					</label>
					<Button
						variant="ghost"
						size="icon" onClick={ theme }
						aria-label={ dark ? t.light : t.dark }
					>
						{ dark ? <Sun size={ 17 }/> : <Moon size={ 17 }/> }
					</Button>
					<Button
						variant="outline"
						className="header-contact"
						onClick={ () => setContact(true) }
					>
						{ t.contact }<ArrowUpRight size={ 16 }/>
					</Button>
					<Button
						className="menu-toggle"
						variant="ghost" size="icon"
						aria-label={ menu ? t.close : t.menu }
						aria-expanded={ menu }
						onClick={ () => setMenu(!menu) }
					>
						{ menu ? <X/> : <Menu/> }
					</Button>
				</div>
			</header>
			{ menu &&
				<nav className="mobile-nav">
					{ t.nav.map((n, i) =>
						<a href={ `#${ ids[i] }` } key={ n } onClick={ () => setMenu(false) }>
							{ n }<ArrowUpRight size={ 18 }/>
						</a>,
					) }
					
					<Button onClick={ () => {
						setMenu(false);
						setContact(true);
					} }>
						{ t.contact }
					</Button>
				</nav>
			}
			
			<main id="main">
				<section className="hero" id="top">
					<div className="hero-grid"/>
					
					<div className="hero-top">
						<span className="eyebrow"><i/>{ t.eyebrow }</span><span
						className="edition">VÉRTICE / BUSINESS & TECHNOLOGY</span>
					</div>
					
					<div className="hero-main">
						<h1>{ t.hero[0] }<br/>{ t.hero[1] }<br/><span>{ t.hero[2] }</span></h1>
						<div className="hero-side">
							<span className="cross">+</span><p>{ t.intro }</p>
							<Button asChild><a href="#expertise">{ t.explore }<ArrowUpRight size={ 18 }/></a></Button>
						</div>
					</div>
					
					<div className="hero-bottom">
						<a href="#expertise"><ArrowDown size={ 16 }/>{ t.scroll }</a>
						<span>01 — 05</span><span className="hero-coordinate">BUSINESS, MEET YOUR NEXT.</span>
					</div>
				</section>
				
				<div className="ticker">
					{ t.strip.map(x => <span key={ x }>{ x }<Plus size={ 17 }/></span>) }
				</div>
				
				<section className="section" id="expertise">
					<div className="section-heading">
						<div>
							<span className="eyebrow">01 / { t.expertise }</span><h2>{ t.title }</h2>
						</div>
						
						<p>{ t.subtitle }</p>
					</div>
					
					<div className="services">
						{ t.services.map((s, i) => {
							const Icon = icons[i];
							
							return (
								<button className={ `service service-${ i }` } key={ s[0] } onClick={ () => setSolution(i) }>
									<div className="service-top"><Icon size={ 25 } strokeWidth={ 1.4 }/><span>0{ i + 1 }</span></div>
									<h3>{ s[0] }</h3><p>{ s[2] }</p>
									<div className="service-bottom"><span>{ s[3] }</span><ArrowUpRight size={ 21 }/></div>
								</button>
							);
						}) }
						
						<div className="service service-last">
							<span className="eyebrow">VÉRTICE ↗</span>
							<h3>{ t.services[4][1] }</h3>
							<button onClick={ () => setContact(true) }>{ t.contact }<ArrowRight size={ 20 }/></button>
						</div>
					</div>
				</section>
				
				<section className="finance section">
					<div className="finance-copy">
						<span className="eyebrow">{ t.view }</span>
						<h2>{ t.financial }</h2>
						<p>{ t.finDesc }</p>
						
						<button className="text-link" onClick={ () => setSolution(0) }>{ t.services[0][0] }
							<ArrowUpRight size={ 19 }/>
						</button>
					</div>
					
					<div className="dashboard">
						<div className="dashboard-header">
							<span>
								<BarChart3 size={ 16 }/>
								{ lang === 'pt' ? 'Visão financeira' : lang === 'es' ? 'Visión financiera' : 'Financial overview' }
							</span>
							
							<span className="demo-label">{ t.demo }</span>
						</div>
						
						<div className="dashboard-controls">
							<span>{ half ? 'JUL — DEC' : 'JAN — JUN' } / 2026</span>
							
							<select
								aria-label={ lang === 'pt' ? 'Período' : lang === 'es' ? 'Período' : 'Period' }
								value={ half }
								onChange={ e => setHalf(Number(e.target.value)) }
							>
								{ t.periods.map((x, i) => <option value={ i } key={ x }>{ x }</option>) }
							</select>
						</div>
						
						<div className="metrics">
							<div>
								<span>{ t.revenue }</span><strong>{ money(total) }</strong>
							</div>
							
							<div>
								<span>{ t.margin }</span><strong>{ (profit / total * 100).toFixed(1) }<small>%</small></strong>
							</div>
							
							<div>
								<span>{ t.result }</span><strong>{ money(profit) }</strong>
							</div>
						</div>
						
						<div
							className="chart" role="img"
							aria-label={ `${ t.chart }: ${ t.months[half].map((m, i) => `${ m }: ${ t.legends[0] } ${ money(rev[i] * 10000) }, ${ t.legends[1] } ${ money(exp[i] * 10000) }`).join('; ') }` }
						>
							<div className="chart-lines">
								<span>1M</span><span>750k</span><span>500k</span><span>250k</span>
							</div>
							
							<div className="bars">
								{ rev.map((n, i) =>
									<div className="bar-group" key={ i }>
										<div className="bar-pair">
											<i style={ { height: `${ n }%` } }/>
											<i style={ { height: `${ exp[i] }%` } }/>
										</div>
										
										<span>{ t.months[half][i] }</span>
									</div>,
								) }
							</div>
						</div>
						
						<div className="legend">
							<span><i/>{ t.legends[0] }</span>
							<span><i/>{ t.legends[1] }</span>
						</div>
					</div>
				</section>
				
				<section className="section" id="approach">
					<span className="eyebrow">02 / { t.method }</span>
					<h2>{ t.methodTitle }</h2>
					
					<div className="steps">
						{ t.steps.map((s, i) =>
							<div key={ s[0] }>
								<span className="step-number">0{ i + 1 }<ArrowRight size={ 20 }/></span>
								<h3>{ s[0] }</h3><p>{ s[1] }</p>
							</div>,
						) }
					</div>
				</section>
				
				<section className="about section" id="about">
					<div>
						<span className="eyebrow">03 / { t.about }</span><h2>{ t.aboutTitle }</h2>
						<div className="name-story">
							<h3>{ t.nameTitle }</h3><p>{ t.nameMeaning }</p>
						</div>
					</div>
					
					<div>
						<p className="about-description">{ t.aboutDesc }</p>
						<ul>{ t.principles.map(x => <li key={ x }><Check size={ 18 }/>{ x }</li>) }</ul>
					</div>
				</section>
				
				<section className="section" id="team">
					<span className="eyebrow">04 / { t.teamLabel }</span>
					<h2>{ t.teamTitle }</h2><p className="team-note">{ t.teamNote }</p>
					<div className="team-grid">
						{ team.map((p, i) =>
							<article key={ p.name }>
								<div className="portrait">
									<img
										src={ asset(p.photo) }
										alt={ `${ p.name } — ${ lang === 'pt' ? 'perfil ilustrativo' : lang === 'es' ? 'perfil ilustrativo' : 'illustrative profile' }` }
										loading="lazy"
										width="600"
										height="650"
									/>
									<span>0{ i + 1 } / VÉRTICE</span>
								</div>
								
								<h3>{ p.name }</h3><p>{ p.role[lang] }</p>
							</article>,
						) }
					</div>
				</section>
				
				<section className="cta section" id="contact">
					<span className="eyebrow">05 / { t.ctaLabel }</span>
					<h2>{ t.cta }</h2>
					<div>
						<p>{ t.ctaText }</p>
						<Button onClick={ () => setContact(true) }>
							{ t.ctaButton }<ArrowUpRight size={ 20 }/>
						</Button>
					</div>
				</section>
			</main>
			
			<footer>
				<div className="footer-main">
					<a href="#" className="logo">
						<span className="brand-symbol">∨</span>vértice<span className="brand-dot">.</span>
					</a>
					<p>{ t.footer }</p>
					<a href="#top">{ t.back }<ArrowUpRight size={ 16 }/></a>
				</div>
				
				<div className="footer-bottom">
					<span>© { new Date().getFullYear() } Vértice. { t.rights }</span><span>STRATEGY. DATA. WHAT’S NEXT.</span>
				</div>
			</footer>
			
			<Button className="chat-launch" onClick={ () => setChat(true) } aria-label={ t.assistant }>
				<Sparkles size={ 18 }/><span>{ t.assistant }</span><Plus size={ 16 }/>
			</Button>
			
			<Dialog
				open={ solution !== null }
				onOpenChange={ open => {
					if (!open) setSolution(null);
				} }
			>
				<DialogContent closeLabel={ t.close }>
					<span className="eyebrow">VÉRTICE / EXPERTISE</span>
					<DialogTitle>{ solution !== null ? t.services[solution][0] : '' }</DialogTitle>
					<DialogDescription>{ solution !== null ? t.services[solution][1] : '' }</DialogDescription>
					<p>{ solution !== null ? t.services[solution][2] : '' }</p>
					<p className="solution-tags">{ solution !== null ? t.services[solution][3] : '' }</p>
					<Button
						onClick={ () => {
							setSolution(null);
							setContact(true);
						} }
					>
						{ t.solutionCTA }<ArrowUpRight size={ 16 }/>
					</Button>
				</DialogContent>
			</Dialog>
			
			<Dialog open={ contact } onOpenChange={ setContact }>
				<DialogContent closeLabel={ t.close }>
					<DialogTitle>{ t.formTitle }</DialogTitle>
					<DialogDescription>{ t.formDesc }</DialogDescription>
					
					<form onSubmit={ form } className="contact-form">
						<div className="form-row">
							<label>
								{ t.name }
								<input name="name" required maxLength={ 100 } autoComplete="name"/>
							</label>
							
							<label>
								{ t.company }
								<input name="company" required maxLength={ 120 } autoComplete="organization"/>
							</label>
						</div>
						
						<label>
							{ t.email }
							<input name="email" type="email" required maxLength={ 200 } autoComplete="email"/>
						</label>
						<label>
							{ t.challenge }
							<textarea name="challenge" required maxLength={ 2000 } rows={ 3 }/>
						</label>
						<Button type="submit">
							{ t.submit }<ArrowRight size={ 16 }/>
						</Button>
					</form>
					
					<p className="form-note" role="status">
						{ siteConfig.contactEmail ? (brief ? t.ready : '') : t.formNote }
					</p>
					{ brief &&
						<div className="brief-actions">
							{ siteConfig.contactEmail &&
								<Button asChild>
									<a
										href={ `mailto:${ siteConfig.contactEmail }?subject=${ encodeURIComponent('Vértice — Project') }&body=${ encodeURIComponent(brief) }` }>
										{ t.send }<ArrowUpRight size={ 16 }/>
									</a>
								</Button>
							}
							<Button variant="outline" onClick={ download }>
								<Download size={ 16 }/>
								{ t.download }
							</Button>
						</div>
					}
				</DialogContent>
			</Dialog>
			
			<Dialog open={ chat } onOpenChange={ setChat }>
				<DialogContent className="chat-dialog" closeLabel={ t.close }>
					<DialogTitle>
						<Sparkles size={ 21 }/>{ t.assistant }
					</DialogTitle>
					
					<DialogDescription>{ siteConfig.aiEndpoint ? t.aiLive : t.aiDemo }</DialogDescription>
					
					<div className="chat-messages" role="log" aria-live="polite">
						<div className="bubble assistant">{ t.aiHello }</div>
						
						{ messages.map((m, i) =>
							<div className={ `bubble ${ m.role }` } key={ i }>
								{ m.text }
							</div>,
						) }
						
						{ busy &&
							<p>{ t.aiBusy }</p>
						}
						
						<div ref={ chatEnd }/>
					</div>
					
					{ messages.length === 0 &&
						<div className="quick-topics">
							{ t.aiTopics.map(x =>
								<button key={ x } onClick={ () => ask(x) }>{ x }<ArrowUpRight size={ 14 }/></button>,
							) }
						</div>
					}
					
					<form
						className="chat-input"
						onSubmit={ e => {
							e.preventDefault();
							ask(message).then(r => {
								// Do something with the response, e.g., update the messages array
							});
						} }
					>
						<input
							value={ message }
							onChange={ e => setMessage(e.target.value) }
							maxLength={ 1500 }
							placeholder={ t.aiPlaceholder }
							aria-label={ t.aiPlaceholder }
							disabled={ busy }
						/>
						
						<Button
							type="submit"
							size="icon"
							disabled={ busy || !message.trim() }
							aria-label={ t.aiSend }
						>
							<Send size={ 17 }/>
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
