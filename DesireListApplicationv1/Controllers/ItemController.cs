using DesireListApplicationv1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DesireListApplicationv1.Controllers
{
    public class ItemController : ApiController
    {
        // POST: api/Item
        // Add item to a list
        public IHttpActionResult Post([FromBody]Item item)
        {
            ItemList itemList =
                ItemListController.itemLists.Where(s => s.Id == item.ListId).FirstOrDefault();

            if(itemList == null)
            {
                return NotFound();
            }
            item.Id = itemList.Items.Max(i => i.Id) + 1;
            itemList.Items.Add(item);

            return Ok(itemList);
        }

        // PUT: api/Item/5
        // Update an existing item
        public IHttpActionResult Put(int id, [FromBody]Item item)
        {
            ItemList itemList =
                ItemListController.itemLists
                .Where(s => s.Id == item.ListId)
                .FirstOrDefault();

            if (itemList == null)
            {
                return NotFound();
            }

            Item changedItem = itemList.Items.Where(i => i.Id == id).FirstOrDefault();

            if(changedItem == null)
            {
                return NotFound();
            }

            changedItem.Checked = item.Checked;

            return Ok(itemList);
        }

        // DELETE: api/Item/5
        // Delete an existing item
        public void Delete(int id)
        {
        }
    }
}
