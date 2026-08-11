'use client';

import { FormEvent, useState } from 'react';

export default function Contact(){
  const [done,setDone]=useState(false);
  function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const data=new FormData(e.currentTarget);
    const message=`Property requirement\nName: ${data.get('name')}\nPhone / WhatsApp: ${data.get('phone')}\nType: ${data.get('type')}\nDetails: ${data.get('details')}`;
    navigator.clipboard?.writeText(message);
    setDone(true);
  }
  return <main className="contact-page"><div className="contact-nav"><a href="../">← Laksar Properties</a><span>PROPERTY ENQUIRY</span></div><div className="contact-wrap"><div className="contact-intro"><span className="kicker">START A CONVERSATION</span><h1>Tell us what<br/><i>you need.</i></h1><p>Share the basics of your requirement. We will keep the conversation focused on location, budget and the type of property you actually want.</p><div className="contact-note"><span>01</span><div><strong>Simple</strong><small>No unnecessary questions.</small></div></div><div className="contact-note"><span>02</span><div><strong>Local</strong><small>Focused around Laksar and nearby areas.</small></div></div></div><form className="enquiry-form" onSubmit={submit}><label>Name<input name="name" required placeholder="Your name"/></label><label>Phone / WhatsApp<input name="phone" required inputMode="tel" placeholder="Your number"/></label><label>Looking for<select name="type" defaultValue="Residential plot" required><option>Residential plot</option><option>Agricultural land</option><option>House</option><option>Commercial property</option></select></label><label>Requirement details<textarea name="details" required rows={6} placeholder="Preferred location, budget, area, timeline…"/></label><button type="submit">{done?'Requirement copied ✓':'Prepare enquiry →'}</button>{done&&<p className="form-success">Your enquiry text has been copied. It can now be pasted into WhatsApp, email or your preferred contact channel.</p>}</form></div></main>
}
